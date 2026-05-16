'use server'

import { Session, InvocationContext } from '@google/adk';
import { locationPipeline } from '@/workflows/locationWorkflow';
import { candidateMatchPipeline } from '@/workflows/candidateMatchWorkflow';
import { factCheckPipeline } from '@/workflows/factCheckWorkflow';
import { AdminTreeSchema, CandidateMatchSchema, FactCheckVerdictSchema } from '@/schemas';

// Utility to extract text from ADK streams and parse JSON
async function runAdkPipeline(pipeline: any, state: Record<string, any>, targetAuthor: string) {
	const session = new Session({ state });
	const context = new InvocationContext({ session });
	const stream = pipeline.runAsync(context);

	let finalOutput = "";
	for await (const event of stream) {
		if (event.author === targetAuthor && event.content?.parts?.[0]?.text) {
			finalOutput = event.content.parts[0].text;
		}
	}

	// Strip markdown formatting if Gemini wrapped the JSON (e.g., ```json ... ```)
	const cleanJson = finalOutput.replace(/```json\n|\n```|```/g, '').trim();
	return JSON.parse(cleanJson);
}

export async function resolveLocation(locationInput: string) {
	try {
		const rawData = await runAdkPipeline(locationPipeline, { locationInput }, 'GeopoliticalAgent');
		const validated = AdminTreeSchema.parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Location Resolution Error:", error);
		return { success: false, error: "Failed to resolve location." };
	}
}

export async function matchCandidates(preference: string, adminUnitId: string) {
	try {
		const rawData = await runAdkPipeline(candidateMatchPipeline, { preference, adminUnitId }, 'AlignmentScorer');
		// Using z.array() since it returns multiple candidates
		const validated = CandidateMatchSchema.array().parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Candidate Match Error:", error);
		return { success: false, error: "Failed to match candidates." };
	}
}

export async function submitFactCheck(claim: string, adminUnitId: string) {
	try {
		const rawData = await runAdkPipeline(factCheckPipeline, { claim, adminUnitId }, 'VerdictSynthesizer');
		const validated = FactCheckVerdictSchema.parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Fact Check Error:", error);
		return { success: false, error: "Fact checking failed." };
	}
}
