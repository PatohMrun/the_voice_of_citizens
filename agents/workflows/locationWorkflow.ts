import { LlmAgent } from '@google/adk';

export const locationPipeline = new LlmAgent({
	name: 'GeopoliticalAgent',
	model: 'gemini-1.5-flash',
	instruction: `You are the VoteWise Geopolitical Engine for Kenya. 
  Current Date: May 16, 2026. Current Location: Nairobi, Kenya.
  
  Map the user input "{locationInput}" to the correct Ward, Constituency, and County.
  If the input is vague, set needsConfirmation to true.
  
  Respond ONLY with a strict JSON object matching this structure:
  {
    "ward": "string or null",
    "constituency": "string",
    "county": "string",
    "national": "Kenya",
    "confidence": 0.0 to 1.0,
    "needsConfirmation": boolean
  }`,
});
