import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, Calculator, AlertTriangle, Check } from 'lucide-react';

interface CostCalculatorProps {
  onClose: () => void;
}

const CostRow = ({ label, value }: { label: string, value: number }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-400">{label}</span>
    <span className="text-white font-medium">${value}</span>
  </div>
);

const FeatureRow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-sm">
    <Check className="w-4 h-4 text-blue-500 shrink-0" />
    <span className="text-slate-300">{label}</span>
  </div>
);

const CostCalculator: React.FC<CostCalculatorProps> = ({ onClose }) => {
  const [channel, setChannel] = useState<'email' | 'linkedin'>('email');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [emailTier, setEmailTier] = useState<1 | 2 | 3>(1);
  const [linkedinTier, setLinkedinTier] = useState<1 | 2 | 5>(1);

  const exchangeRate = 83; // Fixed conversion rate for DIY comparison

  // Helper to format currency
  const formatValue = (val: number) => {
    if (currency === 'INR') {
      return '₹' + Math.round(val).toLocaleString('en-IN');
    }
    return '$' + val.toLocaleString();
  };

  // Email Math
  const emailMultiplier = emailTier;
  const emailDIY = {
    apollo: 149 * emailMultiplier,
    instantly: 97,
    workspaces: 140 * emailMultiplier,
    zerobounce: 60 * emailMultiplier,
    domains: 15 * emailMultiplier,
  };
  const totalEmailDIY_USD = Object.values(emailDIY).reduce((a, b) => a + b, 0);
  const totalEmailBLGS_USD = emailMultiplier * 400;
  
  const totalEmailDIY = currency === 'INR' ? totalEmailDIY_USD * exchangeRate : totalEmailDIY_USD;
  const totalEmailBLGS = currency === 'INR' ? emailMultiplier * 30000 : totalEmailBLGS_USD;

  // LinkedIn Math
  const linkedinMultiplier = linkedinTier;
  const linkedinDIY = {
    salesNav: 99 * linkedinMultiplier,
    automation: 50 * linkedinMultiplier,
    marketingAuto: 30 * linkedinMultiplier,
    aiApi: 50 * linkedinMultiplier,
    proxy: 20 * linkedinMultiplier,
  };
  const totalLinkedinDIY_USD = Object.values(linkedinDIY).reduce((a, b) => a + b, 0);
  const totalLinkedinBLGS_USD = linkedinMultiplier === 5 ? 1250 : linkedinMultiplier * 350;

  const totalLinkedinDIY = currency === 'INR' ? totalLinkedinDIY_USD * exchangeRate : totalLinkedinDIY_USD;
  const totalLinkedinBLGS = currency === 'INR' ? linkedinMultiplier * 25000 : totalLinkedinBLGS_USD;

  const isEmail = channel === 'email';
  const totalDIY = isEmail ? totalEmailDIY : totalLinkedinDIY;
  const totalBLGS = isEmail ? totalEmailBLGS : totalLinkedinBLGS;
  const priceDifference = totalBLGS - totalDIY;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-50 min-h-screen pt-24 pb-12 px-4 md:px-8 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-500" />
            DIY vs BLGS Cost Calculator
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1">
          {/* Currency & Channel Selector */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex justify-center">
              <div className="bg-slate-800 p-1 rounded-xl flex">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'USD' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'INR' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setChannel('email')}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${isEmail ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                Email Marketing
              </button>
              <button
                onClick={() => setChannel('linkedin')}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${!isEmail ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                LinkedIn DM Outreach
              </button>
            </div>
          </div>

          {/* Tier Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Select Scale</h3>
            <div className="flex flex-wrap gap-4">
              {isEmail ? (
                <>
                  {[1, 2, 3].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setEmailTier(tier as 1|2|3)}
                      className={`px-6 py-3 rounded-lg border font-medium transition-all ${emailTier === tier ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {tier * 5},000 Prospects/mo
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {[1, 2, 5].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setLinkedinTier(tier as 1|2|5)}
                      className={`px-6 py-3 rounded-lg border font-medium transition-all ${linkedinTier === tier ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {tier} Profile{tier > 1 ? 's' : ''}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* DIY Column */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Do It Yourself (DIY)</h3>
                <div className="text-2xl font-black text-slate-300">{formatValue(totalDIY)}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Software Costs {currency === 'INR' && '(USD converted to INR)'}</div>
                {isEmail ? (
                  <>
                    <CostRow label="Apollo.io (Data)" value={emailDIY.apollo} />
                    <CostRow label="Instantly or your best tool for (Sending)" value={emailDIY.instantly} />
                    <CostRow label={`Google/MS365 Accounts → ${emailTier * 20} Accounts`} value={emailDIY.workspaces} />
                    <CostRow label="ZeroBounce (Verification)" value={emailDIY.zerobounce} />
                    <CostRow label="Custom Domains" value={emailDIY.domains} />
                  </>
                ) : (
                  <>
                    <CostRow label="LinkedIn Sales Navigator" value={linkedinDIY.salesNav} />
                    <CostRow label="Linkedin automation tool" value={linkedinDIY.automation} />
                    <CostRow label="Marketing Automation" value={linkedinDIY.marketingAuto} />
                    <CostRow label="AI API Cost ($30-$50)" value={linkedinDIY.aiApi} />
                    <CostRow label="Cloud Proxy / VPS" value={linkedinDIY.proxy} />
                  </>
                )}
              </div>

              <div className="pt-6 border-t border-slate-700">
                <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Missing Elements
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Strategy &amp; Planning</li>
                  <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Daily Campaign Management</li>
                  <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Technical Setup &amp; Maintenance</li>
                </ul>
              </div>
            </div>

            {/* BLGS Column */}
            <div className="bg-blue-900/10 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white">BLGS Managed</h3>
                <div className="text-2xl font-black text-blue-400">{formatValue(totalBLGS)}<span className="text-sm text-blue-500/50 font-normal">/mo</span></div>
              </div>

              <div className="space-y-4 mb-6 relative z-10">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">Included Features</div>
                {isEmail ? (
                  <>
                    <FeatureRow label={`${emailTier * 5},000 Verified Emails`} />
                    <FeatureRow label="A/B Tested Copywriting" />
                    <FeatureRow label="Infrastructure Setup & Warmup" />
                    <FeatureRow label="Campaign Management" />
                  </>
                ) : (
                  <>
                    <FeatureRow label={`${linkedinTier} Profile${linkedinTier > 1 ? 's' : ''} Managed`} />
                    <FeatureRow label="Targeted List Building" />
                    <FeatureRow label="1:1 Workflow-Based Research" />
                    <FeatureRow label="No Templates or AI Messaging" />
                    <FeatureRow label="Inbox Management" />
                  </>
                )}
              </div>

              <div className="pt-6 border-t border-blue-500/20 relative z-10">
                <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Value Added
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Done-for-you infrastructure</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Expert campaign management</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Continuous optimization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-8">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200/70 leading-relaxed">
              <strong className="text-yellow-500">Hidden Costs Warning:</strong> The DIY costs above only reflect raw software subscriptions. They do not include the value of your time, initial setup, copywriting, daily management, or technical troubleshooting.
            </p>
          </div>

          {/* Verdict */}
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-2xl text-center">
            <h3 className="text-lg font-bold text-white mb-3">The Verdict</h3>
            <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {priceDifference > 0 
                ? `For just ${formatValue(priceDifference)}/mo more than the raw software costs, you get a fully managed system. You get the exact same enterprise tech stack, but we save you 40+ hours of manual labor and technical headaches.`
                : `Our managed service is actually ${formatValue(Math.abs(priceDifference))}/mo cheaper than buying the tools yourself! We use the exact same enterprise software (Apollo, Instantly, etc.) but pass our agency volume efficiency on to you—plus you get our expert management included for free.`
              }
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default CostCalculator;
