/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ_DATA: FAQItem[] = [
  {
    question: "What makes BLGS one of the top-rated lead generation services for small businesses?",
    answer: "Unlike enterprise agencies that rely on expensive ads and \"spray-and-pray\" tactics, BLGS specializes in high-precision outbound marketing designed specifically for small B2B businesses and startups. We bring 9 years of corporate-level strategy (used by Tech and Manufacturing giants) and make it accessible and affordable for growing teams. We focus on connecting you with decision-makers, not just adding names to a list."
  },
  {
    question: "Are your lead generation services affordable for early-stage startups?",
    answer: "Yes. We understand that startups cannot afford the bloated retainers of big agencies. BLGS offers flexible, \"quality-first\" packages. By focusing on targeted research and infrastructure (data cleaning, domain warming) rather than massive volume, we keep costs lower while driving a higher ROI. You pay for a system that generates revenue, not just noise."
  },
  {
    question: "Do you offer lead generation services with guaranteed leads?",
    answer: "We believe in guaranteed quality over guaranteed quantity. Many agencies promise \"100 leads\" but deliver 100 bad emails that bounce. At BLGS, our \"Surgeon’s Approach\" ensures every lead is a verified, high-intent prospect that fits your Ideal Customer Profile (ICP). We focus on metrics that matter—like booked meetings and pipeline value—rather than vanity numbers."
  },
  {
    question: "How do I choose the right B2B lead generation company?",
    answer: "Look for three things: Infrastructure, Precision, and Personalization. A good agency should first secure your email domains (SPF/DKIM/DMARC) to prevent spam issues. Second, they should refuse to \"spam\" thousands of people and instead target a niche list. Third, they should write human-to-human messages, not robotic templates. BLGS was founded on these three pillars to protect your brand reputation while growing your sales."
  },
  {
    question: "What are the best platforms for B2B lead generation in 2026?",
    answer: "For B2B services, LinkedIn and Cold Email remain the most powerful platforms when used correctly. BLGS uses a multi-channel approach. We use LinkedIn for building credibility and direct engagement with decision-makers, and Cold Email for scalable, personalized outreach. We also integrate these efforts with your CRM to ensure no lead is lost."
  },
  {
    question: "Do you offer targeted lead generation for Tech and Manufacturing companies?",
    answer: "Yes, this is our specialty. Our team holds years of experience driving growth in the Technology, Manufacturing, and Export sectors. We understand the technical nuances of these industries, allowing us to speak the language of your prospects and build credibility instantly."
  },
  {
    question: "Where can I find business lead generation service providers near me?",
    answer: "While BLGS serves clients globally, we operate with the closeness of a local partner. Whether you are in India, the US, or Europe, our digital-first processes allow us to act as an extension of your internal team. We provide weekly reports, transparent communication, and a dedicated strategist to ensure your campaigns run smoothly, regardless of time zones."
  },
  {
    question: "Why is my cold email going to spam?",
    answer: "If your emails are landing in spam, it is rarely just \"bad luck.\" It is usually a technical or behavioral failure. Even if you're a pro, you must manage your DMARC records dynamically. At BLGS, we fix this via a 3-step process:\n\n• Technical Infrastructure: We authenticate your domain with SPF, DKIM, BIMI, and DMARC to avoid being flagged as a threat.\n• Domain Warm-up: We implement a 2-3 week gradual volume increase to build server trust.\n• Content & Engagement: We eliminate spam trigger words and optimize for high engagement to signal to providers that your content is wanted."
  },
  {
    question: "What is the cost of outsourcing lead generation vs. hiring an in-house sales/ SDR team?",
    answer: "Hiring in-house is often 3x to 5x more expensive. \n\nOption A: In-House ($80,000+ / year)\nIncludes SDR salary ($50k-$70k), a tool stack ($9k+ for LinkedIn, Data, and Sending tools), plus months of ramp-up time.\n\nOption B: Partnering with BLGS\nYou get expert strategy, we cover all tool/data costs, and we ramp up in days, not months. You get the results of a Sales Head for less than the price of a junior hire, with zero overhead."
  }
];

const FAQSection: React.FC = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="faq" className="relative z-10 py-28 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-blue-500 font-mono uppercase tracking-widest text-sm mb-3 block">Knowledge Base</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-slate-500 italic">Questions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Everything you need to know about our precision lead generation systems and how we scale B2B pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FAQ_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              className="relative group bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/60 overflow-hidden cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <HelpCircle className="w-5 h-5 text-blue-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {item.question}
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  
                  <motion.div
                    variants={{
                      rest: { opacity: 0, height: 0, marginTop: 0 },
                      hover: { opacity: 1, height: 'auto', marginTop: 16 }
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-4 whitespace-pre-line">
                      {item.answer}
                    </p>
                  </motion.div>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;