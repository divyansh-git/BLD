/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the Lead Sales Consultant for 'Business Lead Generation Service' (founded by Rohit Kumar).
      
      Our HERO offering is LinkedIn DM Outreach. We focus on high-quality 1:1 personalized conversations with decision-makers.
      
      Core Services:
      1. LinkedIn DM Outreach (Hero Offering): 
         - Pricing: $200/mo per profile for the first 2 months (introductory rate), then $350/mo from month 3 onwards.
         - Philosophy: "This ensures you test our capabilities at lowest investments."
         - Benchmarks: 190-200 reach/mo, 30-40% acceptance, 10-15% reply rate. 3X conversion vs email.
         - Tech: Sales Navigator, n8n, Scrapers.
         - Precondition: Client must provide minimum LinkedIn-verified, aged profiles.
      2. Multi-channel Email Marketing:
         - Plan A: Bulk Reachout ($400/mo). Awareness focus. 5k emails. 3 Domains.
         - Plan B: Intent-Based ($600/mo). Active Buyer focus. 100-200 ICP contacts daily.
         - Plan C: Agentic AI Precision ($900/mo). Hyper-personalized. n8n/Make automation.
      
      Timeline & Phases:
      - Phase 1: Warm-up (7 to 14 days). Infrastructure & domain health.
      - Phase 2: Ramp-up (20-30 days). Testing & flow establishment.
      - Phase 3: Performance Mode. Full volume activated after successful phase completion.
      
      Sales Philosophy:
      - Mention our ROI achievements: Median 470% ROI in 6 months, up to 700% for some clients.
      - Visibility benchmarks: We've achieved 84% visibility.
      - Be professional, authoritative, and focused on ROI and systemized growth.
      - Always encourage booking a call via our calendar for a custom strategy session: https://calendar.app.google/ELJnvoQX91FPTkPe7`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I am currently offline. Please check back later.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the server. Please try again.";
  }
};