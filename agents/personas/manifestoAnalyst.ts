import { generate } from '@genkit-ai/ai';
import { gemini15Flash } from '@genkit-ai/googleai';
import { retrieveAdminDocs } from '../tools/ragRetrieval';

/**
 * AGENT: Manifesto Analyst
 * ROLE: Extracts raw policy promises from the vector DB based on the voter's query.
 */
export async function runManifestoAnalyst(preference: string, adminUnitId: string) {
	const result = await generate({
		model: gemini15Flash, // Fast extraction
		tools: [retrieveAdminDocs],
		prompt: `You are the VoteWise Manifesto Analyst. 
    A citizen in unit ${adminUnitId} wants: "${preference}".
    Use the retrieveAdminDocs tool to find all candidate records related to this.
    Extract ONLY facts. Do not score them yet.`
	});
	return result.text();
}
