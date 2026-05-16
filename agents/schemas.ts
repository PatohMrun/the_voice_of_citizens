import { z } from 'zod';

export const AdminTreeSchema = z.object({
	ward: z.string().nullable().describe("e.g., Kasarani Ward"),
	constituency: z.string().describe("e.g., Kasarani"),
	county: z.string().describe("e.g., Nairobi"),
	national: z.string().default('Kenya'),
	confidence: z.number().min(0).max(1),
	needsConfirmation: z.boolean().describe("True if the input was ambiguous")
});

export const CandidateMatchSchema = z.object({
	candidateId: z.string(),
	candidateName: z.string(),
	matchScore: z.number().min(0).max(100),
	explanation: z.string().describe("Why they match, per pillar"),
	flags: z.array(z.string()).describe("Areas conflicting with voter preference")
});

export const SourceSchema = z.object({
	title: z.string(),
	url: z.string().optional(),
	type: z.enum(['RAG_MANIFESTO', 'RAG_VOTING_RECORD', 'WEB']),
	snippet: z.string()
});

export const FactCheckVerdictSchema = z.object({
	verdict: z.enum(['TRUE', 'FALSE', 'PARTIALLY TRUE', 'UNVERIFIABLE']),
	explanation: z.string(),
	sources: z.array(SourceSchema),
	dataGapWarning: z.boolean().describe("True if no RAG data exists for the candidate involved")
});

export const TrendSchema = z.object({
	topic: z.string(),
	summary: z.string(),
	urgency: z.enum(['HIGH', 'MEDIUM', 'LOW']),
	sources: z.array(SourceSchema)
});
