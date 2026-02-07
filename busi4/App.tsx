/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, Menu, X, ArrowRight, Mail, Linkedin, Clock, Rocket, TrendingUp, Info, Shield } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import Logo from './components/Logo';
import FAQSection from './components/FAQSection';
import { ServiceItem } from './types';

const CALENDAR_LINK = "https://calendar.app.google/ELJnvoQX91FPTkPe7";
const LINKEDIN_PAGE = "https://www.linkedin.com/company/business-lead-generation-service";

const ORGANIZATION_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Business Lead Generation Service",
  "url": "https://www.business-lead-generation-service.com",
  "sameAs": [
    "https://www.linkedin.com/company/business-lead-generation-service"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@business-lead-generation-service.com",
    "contactType": "customer support"
  }
});

const LOCAL_BUSINESS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Business Lead Generation Service",
  "image": "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1000&auto=format&fit=crop",
  "description": "High-performance LinkedIn and Email marketing solutions for B2B growth.",
  "url": "https://www.business-lead-generation-service.com",
  "priceRange": "$400-$900/month",
  "email": "info@business-lead-generation-service.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  }
});

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
    description: 'Targeting buyers actively searching for your services. We source 100-200 contacts daily based on real-time signals and behavior tracking.'
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
    category: 'Hero Offering', 
    highlight: '3X Conversion vs Email',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    description: 'Direct conversations with decision-makers. 1:1 personalized touch using Sales Navigator and n8n automation for extreme precision.'
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

// Removed props interface as we no longer need isHydrating
const App: React.FC = () => {
  // Removed useScroll and useTransform for SEO stability
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
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
      window.open(CALENDAR_LINK, '_blank');
    }, 1500);
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
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-gradient-to-b from-slate-900/95 to-transparent backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4 z-50">
           <div className="cursor-pointer flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
             <Logo className="h-14 w-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
             <div className="flex flex-col">
               <span className="font-bold text-sm md:text-lg leading-tight tracking-tight text-white">Business Lead</span>
               <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">Generation Service</span>
             </div>
           </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide text-slate-300 items-center">
          {['Services', 'Process', 'Pricing', 'FAQ'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          
          <a 
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 text-sm font-bold rounded-full hover:bg-blue-50 transition-all duration-300 cursor-pointer no-underline"
            data-hover="true"
          >
            Book a Call <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 p-2"
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
            {['Services', 'Process', 'Pricing', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                {item}
              </button>
            ))}
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-bold no-underline"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - STATIC VISIBILITY FOR SEO */}
      <header className="relative min-h-[100svh] flex flex-col px-4 pt-24 pb-0">
        <div className="z-10 flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-12 md:py-20">
          
          {/* Glowing Status Badge */}
          <div className="relative flex items-center gap-3 text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 bg-blue-900/10 px-6 py-2 rounded-full border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] group overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
            </span>
            <span className="relative">Accepting New Clients</span>
          </div>

          <div className="relative w-full mb-8 text-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              <GradientText text="Multi-channel Lead Generation" />
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 text-center">
            Specializing in <strong>LinkedIn & Email Marketing</strong>. We generate high-performance conversations through human-centric AI precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
             <a 
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 no-underline"
                data-hover="true"
             >
               Book a Call <ArrowRight className="w-5 h-5" />
             </a>
             <button 
                onClick={() => scrollToSection('services')}
                className="bg-slate-800/80 backdrop-blur text-white border border-slate-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-all"
                data-hover="true"
             >
               Explore Services
             </button>
          </div>
        </div>

        {/* Interactive Stats Section */}
        <div className="w-full border-t border-white/10 bg-slate-900/60 backdrop-blur-md py-10 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { label: 'AVG Visibility', value: '30-45%', tooltip: "we have achieved 84% visibility that not something matter these days, ask for case study" },
               { label: 'Sales Conversion', value: '2-10%', tooltip: "Median 470% ROI we have achieved in avg 6 months of campaign" },
               { label: 'Daily Reach', value: '1000+', tooltip: "We can always numbers of reaching out to people as need with gridual scaling, 1000 is the number defined reaching to people with the below A and C plan" },
               { label: 'ROI', value: 'High', tooltip: "we attain average of 450- 700% ROI on our 6 months of campaign, results are based on the numbers shared by the client on project closures" },
             ].map((stat, i) => (
               <div 
                  key={i} 
                  className="text-center group relative cursor-help"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                 <div className="text-3xl md:text-5xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400">{stat.value}</div>
                 <div className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center justify-center gap-1.5">
                   {stat.label} <Info className="w-3 h-3 opacity-50" />
                 </div>
                 
                 <AnimatePresence>
                   {hoveredStat === i && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 p-4 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl z-50 text-xs text-slate-200 leading-relaxed text-center"
                     >
                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
                       {stat.tooltip}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
        </div>
      </header>

      {/* SERVICES GRID */}
      <section id="services" className="relative z-10 py-28 bg-slate-950">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="mb-20 md:px-4">
             <span className="text-blue-500 font-mono uppercase tracking-widest text-sm mb-3 block">Capabilities</span>
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
      <section id="process" className="relative z-10 py-28 bg-slate-900 border-t border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Campaign <br /> <span className="text-blue-400">Timeline</span>
              </h2>
              <p className="text-lg text-slate-400 mb-14 leading-relaxed max-w-xl">
                Precision takes time. Our phases are designed to maintain domain health while maximizing conversion efficiency through steady scaling.
              </p>
              
              <div className="space-y-12">
                {[
                  { 
                    icon: Clock, 
                    title: 'Phase 1: Warm-up (7-14 days)', 
                    desc: 'Gradually warming up domains and inboxes. Infrastructure configuration and security verification.' 
                  },
                  { 
                    icon: Rocket, 
                    title: 'Phase 2: Ramp-up (20-30 days)', 
                    desc: 'Controlled volume increase. Content A/B testing, establishing automation flows, and early signal monitoring.' 
                  },
                  { 
                    icon: TrendingUp, 
                    title: 'Phase 3: Performance Mode', 
                    desc: 'Full-scale delivery activated upon successful completion of previous phases. Stabilized benchmarks and optimal conversion flow.' 
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="relative">
                       <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-blue-500 transition-colors z-10 relative">
                         <step.icon className="w-7 h-7 text-blue-400" />
                       </div>
                       {i !== 2 && <div className="absolute top-14 left-7 w-px h-16 bg-slate-800/50 -z-0" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white transition-colors group-hover:text-blue-400">{step.title}</h4>
                      <p className="text-slate-400 max-w-md text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
               <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between mb-10 border-b border-slate-700 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                    </div>
                    <div className="text-xs font-mono text-slate-500 tracking-widest uppercase">system_health.log</div>
                  </div>
                  
                  <div className="space-y-8 font-mono text-sm">
                    {[
                      { label: 'Phase 1: Setup', color: 'slate-500', width: '25%' },
                      { label: 'Phase 2: Content Optimization', color: 'blue-500', width: '60%' },
                      { label: 'Phase 3: ROI Delivery', color: 'green-400', width: '100%' },
                    ].map((row, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">{row.label}</div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: row.width }}
                             transition={{ duration: 1.5, delay: idx * 0.2 }}
                             className={`bg-${row.color} h-full rounded-full`} 
                           />
                        </div>
                      </div>
                    ))}
                    
                     <div className="mt-10 p-6 bg-slate-900/80 rounded-2xl border border-slate-700 text-slate-300 text-xs leading-relaxed italic">
                       "Infrastructure is the foundation. Performance mode is only engaged when deliverability benchmarks are consistently maintained across all test pools."
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-28 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Execution Plans</h2>
             <p className="text-slate-400 text-lg">Scalable strategies focused on measurable ROI.</p>
          </div>
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                name: 'Plan A: Bulk Reachout', 
                price: '$400', 
                period: '/mo',
                focus: 'Awareness',
                volume: '5,000 Emails/mo',
                features: ['3 Domains, 15 Mailboxes', 'Apollo, ZoomInfo, Crunchbase database', 'A/B Testing', 'Min. Sales Conversions: 1-3'],
                color: 'slate' 
              },
              { 
                name: 'Plan B: Intent-Based', 
                price: '$600', 
                period: '/mo',
                focus: 'Active Buyers',
                volume: '3,000 Emails/mo',
                features: ['Daily 100-200 ICP Contacts', 'Intent Database Workflow', 'Buyer Readiness Filtering', 'Min. Sales Conversions: 2-5'],
                color: 'blue',
                popular: true
              },
              { 
                name: 'Plan C: Agentic AI', 
                price: '$900', 
                period: '/mo',
                focus: 'Precision',
                volume: '5,000 Emails/mo',
                features: ['AI-Powered Personalization', 'n8n/Make Automation', 'Deep Data Enrichment', 'Min. Sales Conversions: 4-10'],
                color: 'cyan' 
              },
            ].map((plan, i) => {
              const isPurchasing = purchasingIndex === i;
              const isPurchased = purchasedIndex === i;
              const isPopular = plan.popular;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`relative p-10 rounded-3xl border flex flex-col transition-all duration-300 bg-slate-900/60 backdrop-blur-xl
                    ${isPopular ? 'border-blue-500 shadow-2xl shadow-blue-900/20' : 'border-slate-800'}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      Most Active
                    </div>
                  )}
                  
                  <div className="mb-10">
                    <h3 className="text-lg font-bold text-slate-300 mb-3">{plan.name}</h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                       <div className="px-3 py-1.5 rounded-lg bg-blue-900/30 text-blue-400 text-xs font-bold border border-blue-500/20">
                          {plan.volume}
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-5 mb-10">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 text-sm text-slate-300">
                        <CheckCircle className={`w-5 h-5 min-w-[20px] ${isPopular ? 'text-blue-400' : 'text-slate-600'}`} />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(i)}
                    disabled={purchasingIndex !== null}
                    className={`w-full py-5 rounded-2xl text-sm font-black transition-all duration-300 uppercase tracking-widest
                      ${isPurchased 
                        ? 'bg-green-500 text-white cursor-default' 
                        : isPurchasing
                          ? 'bg-slate-700 text-slate-300'
                          : isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/40'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                      }`}
                    data-hover="true"
                  >
                    {isPurchasing ? 'Processing...' : isPurchased ? 'Booking Confirmed' : 'Choose Plan'}
                  </button>
                </motion.div>
              );
            })}
          </div>
          
          {/* LinkedIn Hero Offering - STATIC VISIBILITY */}
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 rounded-3xl p-8 md:p-14 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3 fill-current" /> Hero Offering
                  </div>
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
                    <Linkedin className="text-blue-400 w-8 h-8" /> LinkedIn DM Outreach
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Generate high-quality conversations with decision-makers of Client’s ICP segment through a 1:1 personalized touch on LinkedIn. 
                  </p>
                  <p className="text-blue-400 font-bold text-sm italic mb-8">
                    "This ensures you test our capabilities at lowest investments."
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-2xl">
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Precondition</div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        The LinkedIn campaign will only be executed once the following is fulfilled: 
                        <br/>● Client must provide minimum LinkedIn-verified, aged professional profiles 
                        <br/>● Optimization of these profiles (If required) to ensure maximum conversion
                      </p>
                    </div>
                    <div className="p-5 bg-slate-800/40 border border-slate-700 rounded-2xl">
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Tech-stack</div>
                      <p className="text-xs text-slate-300 font-mono">
                        LinkedIn Sales Navigator, N8n, LinkedIn Scraper
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Performance Benchmarks (Per Profile)</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: 'Monthly Reach', value: '190–200' },
                        { label: 'Acceptance Rate', value: '30–40%' },
                        { label: 'Reply Rate', value: '10–15%' },
                        { label: 'Conversion', value: '3X higher' },
                      ].map((m, idx) => (
                        <div key={idx} className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                          <div className="text-xl font-bold text-white mb-1">{m.value}</div>
                          <div className="text-[10px] uppercase text-slate-500 tracking-wider font-bold">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-end border-t lg:border-t-0 lg:border-l border-slate-800 pt-10 lg:pt-0 lg:pl-10">
                  <div className="text-center lg:text-right mb-10 w-full">
                    <div className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-widest">Pricing Structure</div>
                    
                    <div className="mb-6 p-4 bg-blue-900/20 rounded-2xl border border-blue-500/20">
                      <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Months 1-2</div>
                      <div className="text-4xl font-bold text-white">$200</div>
                      <div className="text-xs text-slate-400 mt-1">/profile /mo</div>
                    </div>

                    <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700">
                      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Month 3 Onwards</div>
                      <div className="text-4xl font-bold text-white">$350</div>
                      <div className="text-xs text-slate-400 mt-1">/profile /mo</div>
                    </div>
                  </div>
                  
                  <a 
                    href={CALENDAR_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 text-center no-underline"
                    data-hover="true"
                  >
                    Start Campaign
                  </a>
                </div>
              </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      <footer className="relative z-10 border-t border-slate-800 py-20 bg-slate-950">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORGANIZATION_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LOCAL_BUSINESS_SCHEMA }} />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
             <div className="mb-8 group flex items-center gap-4">
               <Logo className="h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
               <div className="flex flex-col text-left">
                 <span className="font-bold text-xl tracking-tight text-white">Business Lead</span>
                 <span className="text-[10px] font-medium tracking-[0.3em] text-blue-500 uppercase">Generation Service</span>
               </div>
             </div>
             <div className="text-sm text-slate-500 font-medium">
               <p className="mb-6 text-slate-300">info@business-lead-generation-service.com</p>
               <div className="text-[10px] uppercase tracking-widest opacity-50">© 2025 BLG Services. All rights reserved.</div>
             </div>
          </div>
          
          <div className="flex gap-6 items-center">
            <a 
              href={LINKEDIN_PAGE} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all hover:scale-110 active:scale-90"
              data-hover="true"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:info@business-lead-generation-service.com"
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all hover:scale-110 active:scale-90"
              data-hover="true"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all hover:scale-110 active:scale-90"
              data-hover="true"
            >
              <Shield className="w-5 h-5" />
            </a>
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl group/modal"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-white hover:text-black transition-all"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-slate-800">
                 <img 
                    src={selectedService.image} 
                    alt={selectedService.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover/modal:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                     <div className="text-blue-400 font-mono text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 bg-blue-900/40 rounded-full border border-blue-500/20 inline-block">{selectedService.category}</div>
                     <div className="text-3xl font-bold text-white tracking-tight">{selectedService.name}</div>
                  </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
                  <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Zap className="w-4 h-4 fill-current" /> Core Strategy
                  </h3>
                  <p className="text-2xl text-slate-200 font-medium mb-10 leading-relaxed">
                    {selectedService.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                       <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Key Metric</div>
                       <div className="text-white font-bold">{selectedService.highlight}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
                       <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Efficiency</div>
                       <div className="text-green-400 font-bold flex items-center gap-2 tracking-tight">3X Performance</div>
                    </div>
                  </div>

                  <a 
                    href={CALENDAR_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white py-4 px-10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all self-start shadow-xl shadow-blue-600/20 no-underline"
                    data-hover="true"
                  >
                    Discuss Plan
                  </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;