import { db } from '../lib/firebaseAdmin';
import { aiClient } from '../lib/aiClient';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * ADK Tool: Searches Firestore Vector Database for candidate manifestos
 */
export async function searchAdminDocs(args: { query: string; adminUnitId: string }): Promise<string> {
	try {
		// 1. Generate embedding for the query
		const embeddingResponse = await aiClient.models.embedContent({
			model: 'text-embedding-004',
			contents: args.query,
		});

		const queryVector = embeddingResponse.embeddings?.[0]?.values;
		if (!queryVector) return "NO_DATA_FOUND";

		// 2. Perform Firestore Vector Search with Location Pre-filtering
		const vectorQuery = db.collection('documents')
			.where('adminUnitId', '==', args.adminUnitId)
			.where('status', '==', 'verified')
			.findNearest('embedding_vector', FieldValue.vector(queryVector), {
				limit: 8,
				distanceMeasure: 'COSINE'
			});

		const snapshot = await vectorQuery.get();
		if (snapshot.empty) return "NO_DATA_FOUND";

		// 3. Format retrieved chunks for the ADK LLM
		const results = snapshot.docs.map(doc => {
			const data = doc.data();
			return `[Candidate ID: ${data.candidateId} | Name: ${data.candidateName}] Context: ${data.chunk_text}`;
		});

		return results.join('\n\n');

	} catch (error) {
		console.error("Firestore Vector Search Error:", error);
		return "NO_DATA_FOUND"; // Failsafe
	}
}
