import { FunctionTool } from '@google/adk';
import { z } from 'zod';
import { db } from '../lib/firebaseAdmin';
import { aiClient } from '../lib/aiClient';
import { FieldValue } from 'firebase-admin/firestore';

export const searchAdminDocs = new FunctionTool({
	name: 'searchAdminDocs',
	description: 'Searches verified candidate manifestos and documents in Firestore for a given administrative unit. Returns relevant text chunks.',
	parameters: z.object({
		query: z.string().describe('The search query'),
		adminUnitId: z.string().describe('The ward or constituency ID to filter by'),
	}),
	execute: async (args): Promise<string> => {
		try {
			const embeddingResponse = await aiClient.models.embedContent({
				model: 'text-embedding-004',
				contents: args.query,
			});

			const queryVector = embeddingResponse.embeddings?.[0]?.values;
			if (!queryVector) return 'NO_DATA_FOUND';

			const vectorQuery = db.collection('documents')
				.where('adminUnitId', '==', args.adminUnitId)
				.where('status', '==', 'verified')
				.findNearest('embedding_vector', FieldValue.vector(queryVector), {
					limit: 8,
					distanceMeasure: 'COSINE',
				});

			const snapshot = await vectorQuery.get();
			if (snapshot.empty) return 'NO_DATA_FOUND';

			return snapshot.docs
				.map(doc => {
					const data = doc.data();
					return `[Candidate ID: ${data.candidateId} | Name: ${data.candidateName}] Context: ${data.chunk_text}`;
				})
				.join('\n\n');
		} catch (error) {
			console.error('Firestore Vector Search Error:', error);
			return 'NO_DATA_FOUND';
		}
	},
});
