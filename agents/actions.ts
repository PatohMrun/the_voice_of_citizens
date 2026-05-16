'use server'

import { InMemoryRunner } from '@google/adk';
import { locationPipeline } from './workflows/locationWorkflow';
import { candidateMatchPipeline } from './workflows/candidateMatchWorkflow';
import { factCheckPipeline } from './workflows/factCheckWorkflow';
import { AdminTreeSchema, CandidateMatchSchema, FactCheckVerdictSchema } from './schemas';

/** Helper to run an ADK pipeline, extract the final text, and parse JSON */
async function runAdkPipeline(pipeline: any, state: Record<string, any>, targetAuthor: string) {
	const runner = new InMemoryRunner({ agent: pipeline, appName: 'VoteWise' });
	const stream = runner.runEphemeral({
		userId: "system",
		stateDelta: state,
		newMessage: { parts: [{ text: JSON.stringify(state) }] }
	});

	let finalOutput = "";
	for await (const event of stream) {
		if (event.author === targetAuthor && event.content?.parts?.[0]?.text) {
			finalOutput = event.content.parts[0].text;
		}
	}

	// Strip Markdown wrapping if Gemini returns ```json ... ```
	const cleanJson = finalOutput.replace(/```json\n|\n```|```/g, '').trim();
	return JSON.parse(cleanJson);
}

export async function resolveLocationAction(locationInput: string) {
	try {
		const rawData = await runAdkPipeline(locationPipeline, { locationInput }, 'GeopoliticalAgent');
		const validated = AdminTreeSchema.parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Location Resolution Error:", error);
		return { success: false, error: "Failed to resolve location." };
	}
}

export async function matchCandidatesAction(preference: string, adminUnitId: string) {
	try {
		const rawData = await runAdkPipeline(candidateMatchPipeline, { preference, adminUnitId }, 'AlignmentScorer');
		const validated = CandidateMatchSchema.array().parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Candidate Match Error:", error);
		return { success: false, error: "Failed to match candidates." };
	}
}

export async function submitFactCheckAction(claim: string, adminUnitId: string) {
	try {
		const rawData = await runAdkPipeline(factCheckPipeline, { claim, adminUnitId }, 'VerdictSynthesizer');
		const validated = FactCheckVerdictSchema.parse(rawData);
		return { success: true, data: validated };
	} catch (error) {
		console.error("Fact Check Error:", error);
		return { success: false, error: "Fact checking failed." };
	}
}
