
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  image: string;
  highlight: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  PROCESS = 'process',
  PRICING = 'pricing',
}
