
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle, Zap, BarChart, Menu, X, ArrowRight, Mail, Linkedin, ChevronLeft, ChevronRight, Target, Server, Shield, Clock, Rocket, TrendingUp } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard'; // Repurposed component
import AIChat from './components/AIChat';
import Logo from './components/Logo';
import { ServiceItem } from './types';

// Lead Generation Services Data updated from document
const SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    name: 'Bulk Reachout', 
    category: 'Email Plan A', 
    highlight: '5,000 Emails/Mo',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1000&auto=format&fit=crop',
    description: 'High-volume awareness campaigns designed for low-CAC acquisition. Includes database hygiene, A/B testing, and deliverability monitoring.'
  },
  { 
    id: '2', 
    name: 'Intent-Based Outreach', 
    category: 'Email Plan B', 
    highlight: 'Active Buyer Targeting',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    description: 'Targeting buyers actively searching for your services. We source 100 contacts daily based on real-time signals and behavior tracking.'
  },
  { 
    id: '3', 
    name: 'Agentic AI Precision', 
    category: 'Email Plan C', 
    highlight: 'Hyper-Personalized',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    description: 'Fully personalized emails using AI on extreme ICPs. Built with n8n/Make workflows for deep data enrichment and dynamic personalization.'
  },
  { 
    id: '4', 
    name: 'LinkedIn DM Campaign', 
    category: 'Social Selling', 
    highlight: '3X Conversion vs Email',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    description: 'Second-touch outreach on LinkedIn. We generate high-quality conversations with decision-makers using aged, verified professional profiles.'
  },
  { 
    id: '5', 
    name: 'Tech Stack & Setup', 
    category: 'Infrastructure', 
    highlight: 'Apollo, Instantly, n8n',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description: 'Complete setup of domains, mailboxes, and warming protocols. We ensure SPF, DKIM, and DMARC compliance for maximum deliverability.'
  },
  { 
    id: '6', 
    name: 'Data Enrichment', 
    category: 'Intelligence', 
    highlight: 'Verified ICPs',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'We enrich prospect data with SEO, social bio, company keywords, funding news, and recent job promotions to fuel relevant outreach.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService) return;
      if (e.key === 'ArrowLeft') navigateService('prev');
      if (e.key === 'ArrowRight') navigateService('next');
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateService = (direction: 'next' | 'prev') => {
    if (!selectedService) return;
    const currentIndex = SERVICES.findIndex(a => a.id === selectedService.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % SERVICES.length;
    } else {
      nextIndex = (currentIndex - 1 + SERVICES.length) % SERVICES.length;
    }
    setSelectedService(SERVICES[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500 selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <AIChat />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3 z-50">
           {/* Use the new Logo Component */}
           <div className="cursor-default" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
             <Logo className="h-16 w-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
           </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide text-slate-300 items-center">
          {['Services', 'Process', 'Pricing'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          
          <button 
            onClick={() => scrollToSection('pricing')}
            className="hidden md:inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 text-sm font-bold rounded-full hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            data-hover="true"
          >
            Book a Call <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-slate-900 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Services', 'Process', 'Pricing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('pricing')}
              className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-bold"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-[100svh] flex flex-col px-4 pt-24 pb-0">
        {/* Content Wrapper - flex-grow pushes footer down */}
        <motion.div 
          style={{ y, opacity }}
          className="z-10 flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-12 md:py-20"
        >
           {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-sm font-mono text-blue-400 uppercase tracking-widest mb-6 bg-blue-900/20 px-4 py-1.5 rounded-full border border-blue-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Clients
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full mb-8 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              Multi-Channel <br />
              <GradientText text="Lead Generation" />
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 text-center"
          >
            Specializing in <strong>Email & LinkedIn Marketing</strong> strategies that convert. From bulk awareness to agentic AI precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4"
          >
             <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                data-hover="true"
             >
               View Plans <ArrowRight className="w-5 h-5" />
             </button>
             <button 
                onClick={() => scrollToSection('services')}
                className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-colors"
                data-hover="true"
             >
               Explore Services
             </button>
          </motion.div>
        </motion.div>

        {/* Social Proof / Stats - Changed from absolute to normal flow to prevent overlap */}
        <div className="w-full border-t border-white/10 bg-slate-900/50 backdrop-blur-sm py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: 'AVG Visibility', value: '30-45%' },
               { label: 'Sales Conversion', value: '2-10%' },
               { label: 'Daily Reach', value: '1000+' },
               { label: 'ROI', value: 'High' },
             ].map((stat, i) => (
               <div key={i} className="text-center border-r border-white/5 last:border-0">
                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                 <div className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </header>

      {/* SERVICES GRID */}
      <section id="services" className="relative z-10 py-24 bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="mb-16 md:px-4">
             <span className="text-blue-500 font-mono uppercase tracking-widest text-sm mb-2 block">Capabilities</span>
             <h2 className="text-4xl md:text-6xl font-bold text-white">
              Outreach <span className="text-slate-600">Architecture</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-800">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} artist={service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="relative z-10 py-24 bg-slate-900 border-t border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Campaign <br /> <span className="text-blue-400">Timeline</span>
              </h2>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                We follow a strict phased approach to ensure sustainable inboxing, higher response rates, and long-term success.
              </p>
              
              <div className="space-y-12">
                {[
                  { 
                    icon: Clock, 
                    title: 'Phase 1: Warm-up (Day 0-20)', 
                    desc: 'Gradually warming up sending domains and inboxes. No cold ICP emails are sent. Setup of SPF, DKIM, DMARC.' 
                  },
                  { 
                    icon: Rocket, 
                    title: 'Phase 2: Ramp-up (Day 20-40)', 
                    desc: 'Controlled volume increase. Finalizing email copies, A/B testing subject lines, and establishing automation flows.' 
                  },
                  { 
                    icon: TrendingUp, 
                    title: 'Phase 3: Performance (Day 40 onwards)', 
                    desc: 'Full volume delivery. Systems are stabilized. Expect optimal open rates, replies, and sales conversions from here.' 
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="relative">
                       <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-blue-500 transition-colors z-10 relative">
                         <step.icon className="w-6 h-6 text-blue-400" />
                       </div>
                       {i !== 2 && <div className="absolute top-12 left-6 w-px h-16 bg-slate-800 -z-0" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white">{step.title}</h4>
                      <p className="text-slate-400 max-w-md text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block">
               <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
               <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs font-mono text-slate-500">performance_report.pdf</div>
                  </div>
                  
                  <div className="space-y-6 font-mono text-sm">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">Month 1 (Warmup)</div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                         <div className="bg-slate-500 h-2 rounded-full w-[10%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">Month 2 (Testing)</div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                         <div className="bg-blue-500 h-2 rounded-full w-[45%]" />
                      </div>
                    </div>
                     <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">Month 3 (Scaling)</div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                         <div className="bg-green-400 h-2 rounded-full w-[95%]" />
                      </div>
                    </div>
                    
                     <div className="mt-8 p-4 bg-slate-900 rounded border border-slate-700 text-slate-300 text-xs">
                       <strong>Note:</strong> No results expected in Month 1. Month 2 is for content testing. Month 3 delivers stabilized benchmarks.
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h2>
             <p className="text-slate-400">All prices inclusive of tools and service charges.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                name: 'Plan A: Bulk Reachout', 
                price: '$400', 
                period: '/mo',
                focus: 'Awareness',
                volume: '5,000 Emails/mo',
                features: ['3 Domains, 15 Mailboxes', 'Apollo, ZoomInfo, Crunchbase database', 'A/B Testing', 'Expected booked meetings: 5-6'],
                color: 'slate' 
              },
              { 
                name: 'Plan B: Intent-Based', 
                price: '$600', 
                period: '/mo',
                focus: 'Active Buyers',
                volume: '3,000 Emails/mo',
                features: ['Daily 100-200 ICP Contacts', 'Intent Database Workflow', 'Buyer Readiness Filtering', 'Expected booked meetings: 5-10'],
                color: 'blue',
              },
              { 
                name: 'Plan C: Agentic AI', 
                price: '$900', 
                period: '/mo',
                focus: 'Precision',
                volume: '5,000 Emails/mo',
                features: ['AI-Powered Personalization', 'n8n/Make Automation', 'Deep Data Enrichment', 'Expected booked meetings: 8-15'],
                color: 'cyan', 
                popular: true
              },
            ].map((plan, i) => {
              const isPurchasing = purchasingIndex === i;
              const isPurchased = purchasedIndex === i;
              const isPopular = plan.popular;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 bg-slate-900/50 backdrop-blur-xl
                    ${isPopular ? 'border-blue-500 shadow-2xl shadow-blue-900/20' : 'border-slate-800'}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-300 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-500 text-sm">{plan.period}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                       <div className={`px-2 py-1 rounded bg-${plan.color === 'blue' ? 'blue' : 'slate'}-800 text-${plan.color === 'blue' ? 'blue' : 'slate'}-300 border border-${plan.color === 'blue' ? 'blue' : 'slate'}-700`}>
                          {plan.volume}
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle className={`w-5 h-5 min-w-[20px] ${isPopular ? 'text-blue-400' : 'text-slate-600'}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    // onClick={() => handlePurchase(i)}
                    onClick={() => window.open('https://calendar.app.google/736YtMEKYttwxpb9A', '_blank')}
                    disabled={purchasingIndex !== null}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-300
                      ${isPurchased 
                        ? 'bg-green-500 text-white cursor-default' 
                        : isPurchasing
                          ? 'bg-slate-700 text-slate-300'
                          : isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                      }`}
                    data-hover="true"
                  >
                    {isPurchasing ? 'Processing...' : isPurchased ? 'Plan Selected' : 'Choose Plan'}
                  </button>
                </motion.div>
              );
            })}
          </div>
          
          {/* LinkedIn Add-on */}
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <h3 className="text-xl font-bold text-white flex items-center gap-2"><Linkedin className="text-blue-400" /> LinkedIn DM Outreach Add-on</h3>
                 <p className="text-slate-400 text-sm mt-2">Generate high-quality conversations via a second touch. Requires client-provided aged profiles.</p>
                 <div className="flex gap-4 mt-4 text-sm text-slate-500">
                    <span>• 190-200 Req/Week</span>
                    <span>• 10-15% Reply Rate</span>
                 </div>
              </div>
              <div className="text-right">
                 <div className="text-2xl font-bold text-white">$200 <span className="text-sm font-normal text-slate-500">/profile</span></div>
                 <span className="text-sm ml-2 font-normal text-slate-500">for first 2 months</span>
                 <button className="mt-2 text-blue-400 text-sm hover:text-blue-300 font-medium">Contact for Setup</button>
              </div>
          </div>

        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <div className="mb-6">
               <Logo className="h-24 w-auto opacity-90" />
             </div>
             <div className="text-sm text-slate-500">
               <p className="mb-2">Rohit Kumar</p>
               <p className="mb-4">rohit@business-lead-generation-service.com</p>
               © 2025 Business Lead Gen Services. All rights reserved.
             </div>
          </div>
          
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/company/business-lead-generation-service/" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:rohit@business-lead-generation-service.com" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Shield className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-2xl group/modal"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-slate-800">
                 <img 
                    src={selectedService.image} 
                    alt={selectedService.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                     <div className="text-blue-400 font-mono text-xs uppercase mb-2">{selectedService.category}</div>
                     <div className="text-2xl font-bold text-white">{selectedService.name}</div>
                  </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Key Benefit
                  </h3>
                  <p className="text-2xl text-slate-200 font-light mb-8 leading-relaxed">
                    {selectedService.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded bg-slate-800 border border-slate-700">
                       <div className="text-slate-400 text-xs uppercase mb-1">Highlight</div>
                       <div className="text-white font-bold">{selectedService.highlight}</div>
                    </div>
                    <div className="p-4 rounded bg-slate-800 border border-slate-700">
                       <div className="text-slate-400 text-xs uppercase mb-1">Timeline</div>
                       <div className="text-green-400 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full" /> Month 3 ROI</div>
                    </div>
                  </div>

                  <button 
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-500 transition-colors self-start"
                    data-hover="true"
                    onClick={() => {
                      setSelectedService(null);
                      scrollToSection('pricing');
                    }}
                  >
                    View Pricing for {selectedService.name}
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
