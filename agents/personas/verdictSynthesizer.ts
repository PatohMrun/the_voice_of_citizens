import { generate } from '@genkit-ai/ai';
import { gemini15Pro } from '@genkit-ai/googleai';
import { FactCheckVerdictSchema } from '../schemas';

/**
 * AGENT: Verdict Synthesizer (The Judge)
 * ROLE: Weighs local RAG facts vs National Web facts and declares a verdict.
 */
export async function runVerdictSynthesizer(claim: string, localFacts: string, webFacts: string) {
	const result = await generate({
		model: gemini15Pro,
		prompt: `You are the VoteWise Chief Fact-Checking Judge. The current year is 2026.
    
    Evaluate this claim: "${claim}"
    
    Evidence from Local Admin Documents (RAG): ${localFacts}
    Evidence from the Web: ${webFacts}
    
    Rules:
    1. If RAG says "NO_DATA_FOUND" and Web has nothing, verdict is UNVERIFIABLE and dataGapWarning is TRUE.
    2. If Web contradicts RAG (e.g., a candidate lied in their manifesto), flag it as FALSE.
    
    Return the strict JSON format.`,
		output: { schema: FactCheckVerdictSchema }
	});
	return result.output();
}
