/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const INITIAL_MESSAGE: ChatMessage = { 
  role: 'model', 
  text: 'Hello. I am your LeadGen Assistant. How can I help you grow your business today?' 
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleClear = () => {
    if (window.confirm("Clear conversation history?")) {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white tracking-wide text-sm">SALES ASSISTANT</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleClear} 
                  title="Clear chat"
                  className="text-slate-400 hover:text-red-400 transition-colors"
                  data-hover="true"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-slate-400 hover:text-white transition-colors" 
                  data-hover="true"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 scroll-smooth bg-slate-950/50"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-700 bg-slate-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about pricing or strategy..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                  data-hover="true"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50 border border-white/10 z-50 group"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;