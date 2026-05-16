import { LlmAgent, ParallelAgent, SequentialAgent } from '@google/adk';
import { searchAdminDocs } from '../tools/ragRetrieval';
import { kenyanWebSearch } from '../tools/webSearch';

const localVerifier = new LlmAgent({
	name: 'LocalVerifier',
	model: 'gemini-1.5-flash',
	instruction: `Use the searchAdminDocs tool to find verified facts related to the claim: "{claim}" in unit {adminUnitId}.
  If no data is found, reply exactly with "NO_DATA_FOUND".`,
	tools: [searchAdminDocs],
	outputKey: 'local_evidence'
});

const webVerifier = new LlmAgent({
	name: 'WebVerifier',
	model: 'gemini-1.5-flash',
	instruction: `Use the kenyanWebSearch tool to verify this political claim: "{claim}". 
  The current date is May 16, 2026. Ensure facts align with current events in Kenya.`,
	tools: [kenyanWebSearch],
	outputKey: 'web_evidence'
});

// Fan-Out Orchestration
const gatherEvidence = new ParallelAgent({
	name: 'GatherEvidence',
	subAgents: [localVerifier, webVerifier]
});

const verdictSynthesizer = new LlmAgent({
	name: 'VerdictSynthesizer',
	model: 'gemini-1.5-pro',
	instruction: `You are the VoteWise Chief Fact-Checking Judge. Current Year: 2026.
  Evaluate the original claim: "{claim}".
  
  Local Admin Evidence (RAG): {local_evidence}
  Web Evidence: {web_evidence}
  
  Rules:
  1. If RAG is "NO_DATA_FOUND" and Web lacks evidence, verdict is UNVERIFIABLE (set dataGapWarning to true).
  2. If Web contradicts RAG, flag as FALSE.
  
  Respond ONLY with a JSON object matching this schema:
  {
    "verdict": "TRUE" | "FALSE" | "PARTIALLY TRUE" | "UNVERIFIABLE",
    "explanation": "string",
    "dataGapWarning": boolean
  }`,
});

export const factCheckPipeline = new SequentialAgent({
	name: 'FactCheckPipeline',
	subAgents: [gatherEvidence, verdictSynthesizer]
});
