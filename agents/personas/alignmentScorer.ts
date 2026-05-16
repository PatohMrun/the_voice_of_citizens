import { generate } from '@genkit-ai/ai';
import { gemini15Pro } from '@genkit-ai/googleai';
import { z } from 'zod';
import { CandidateMatchSchema } from '../schemas';

/**
 * AGENT: Alignment Scorer
 * ROLE: Takes the raw facts from the Analyst and calculates a strict, objective match score.
 */
export async function runAlignmentScorer(preference: string, analystFacts: string) {
	const result = await generate({
		model: gemini15Pro, // High reasoning for accurate scoring
		prompt: `You are the VoteWise Alignment Scorer.
    Voter Preference: "${preference}"
    
    Verified Candidate Facts:
    ${analystFacts}
    
    Calculate a match score (0-100) for each candidate.
    If a candidate's past voting record contradicts their manifesto, reduce their score and add a flag.
    Be strictly neutral and objective.`,
		output: { schema: z.array(CandidateMatchSchema) }
	});
	return result.output();
}
