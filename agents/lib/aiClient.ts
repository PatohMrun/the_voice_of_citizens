import { GoogleGenAI } from '@google/genai';

// Centralized client for tasks outside of ADK (like raw embeddings for RAG)
export const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
