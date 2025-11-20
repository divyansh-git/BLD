
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
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a Senior Sales Consultant for 'Business Lead Generation Services' (Rohit Kumar).
      
      We specialize in Multi-channel Outreach:
      1. Email Marketing (Apollo, Instantly, ZeroBounce stack).
      2. LinkedIn DM Outreach (Sales Navigator, Automation).
      
      Pricing Plans:
      - Plan A: Bulk Reachout ($400/mo). 5,000 emails. Focus on Awareness. Tech: Apollo, ZoomInfo, Crunchbase + 3 Custom Domains.
      - Plan B: Intent-Based ($600/mo). 2,000-3,000 emails. Focus on Active Buyers. 100-200 ICP contacts daily.
      - Plan C: Agentic AI Precision ($900/mo). 5,000 emails. AI-personalized. Tech: n8n/Make, OpenAI.
      
      Add-ons:
      - LinkedIn Outreach: $180/mo per profile. (Client provides aged profiles).
      
      Timeline / Expectations:
      - Phase 1: Warm-up & Setup (Day 0-20).
      - Phase 2: Ramp-up & Content Testing (Day 20-40).
      - Phase 3: Performance (Day 40 onwards).
      
      Goal: Guide visitors to choose a plan based on their volume and personalization needs.`,
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
