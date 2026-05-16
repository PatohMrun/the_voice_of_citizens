import { LlmAgent, SequentialAgent } from '@google/adk';
import { searchAdminDocs } from '../tools/ragRetrieval';

const manifestoAnalyst = new LlmAgent({
	name: 'ManifestoAnalyst',
	model: 'gemini-1.5-flash',
	instruction: `A citizen in administrative unit {adminUnitId} states their preference: "{preference}".
  Use the searchAdminDocs tool to find all candidate records related to this issue.
  Extract ONLY facts. Do not score or evaluate them.`,
	tools: [searchAdminDocs],
	outputKey: 'raw_manifesto_facts'
});

const alignmentScorer = new LlmAgent({
	name: 'AlignmentScorer',
	model: 'gemini-1.5-pro',
	instruction: `You are the VoteWise Alignment Scorer. Current Date: May 16, 2026.
  Voter Preference: "{preference}"
  Verified Candidate Facts: {raw_manifesto_facts}
  
  Calculate a match score (0-100) for each candidate.
  If facts contradict preference, reduce score and add flags.
  
  Respond ONLY with a JSON array of objects matching this schema:
  [{
    "candidateId": "string",
    "candidateName": "string",
    "matchScore": number,
    "explanation": "string",
    "flags": ["string"]
  }]`,
});

export const candidateMatchPipeline = new SequentialAgent({
	name: 'CandidateMatchPipeline',
	subAgents: [manifestoAnalyst, alignmentScorer]
});
