'use server'

import { db } from './lib/firebaseAdmin';
import { aiClient } from './lib/aiClient';
import { FieldValue } from 'firebase-admin/firestore';

export async function ingestDocumentAction(payload: {
	candidateId: string;
	candidateName: string;
	adminUnitId: string;
	documentText: string;
}) {
	try {
		const { candidateId, candidateName, adminUnitId, documentText } = payload;

		if (!documentText || typeof documentText !== 'string') {
			return { success: false, error: "Invalid document text" };
		}

		// 1. Basic Text Chunking (Split by ~1000 characters without breaking words)
		const chunks = documentText.match(/[\s\S]{1,1000}(?!\S)/g) || [];
		const batch = db.batch();

		for (const chunk of chunks) {
			// 2. Generate Embeddings via Gemini
			const embeddingRes = await aiClient.models.embedContent({
				model: 'text-embedding-004',
				contents: chunk,
			});

			const vector = embeddingRes.embeddings?.[0]?.values;
			if (!vector) throw new Error("Failed to generate embedding vector");

			// 3. Prepare Firestore Write (Vector Storage)
			const docRef = db.collection('documents').doc();

			batch.set(docRef, {
				candidateId,
				candidateName,
				adminUnitId,
				chunk_text: chunk.trim(),
				embedding_vector: FieldValue.vector(vector),
				status: 'verified',
				createdAt: FieldValue.serverTimestamp(),
			});
		}

		// 4. Commit atomically
		await batch.commit();

		return {
			success: true,
			message: `Successfully indexed ${chunks.length} chunks for ${candidateName}.`
		};

	} catch (error) {
		console.error("Document Ingestion Error:", error);
		return { success: false, error: "Failed to ingest document" };
	}
}
