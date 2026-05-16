"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, ChevronRight, CheckCircle2, User, Building, Map, Flag, Send, Bot, FileText, Paperclip, X, TrendingUp, AlertTriangle, CheckCircle, Calendar, Timer } from 'lucide-react';
import Link from 'next/link';

// Mock data to simulate the backend resolution
const MOCK_LOCATION = {
  ward: "Mwembe Tayari",
  constituency: "Mvita",
  county: "Mombasa",
  national: "Kenya"
};

const MOCK_TRENDING = [
  { id: 1, topic: "Healthcare Funding Cuts", tags: ["County", "Budget"], trending: true },
  { id: 2, topic: "Port Expansion Project", tags: ["National", "Economy"], trending: true },
  { id: 3, topic: "Youth Tech Hubs", tags: ["Ward", "Development"], trending: true },
];

const MOCK_FACT_CHECKS = [
  { id: 1, claim: "Governor spent 2B on roads this year.", verdict: "FALSE", candidate: "Abdulswamad Nassir" },
  { id: 2, claim: "Secured 50M CDF for local bursaries.", verdict: "TRUE", candidate: "Omar Said" },
];

const MOCK_CANDIDATES = [
  // Ward Level
  { id: "1", name: "Ali Hassan", position: "MCA", level: "Ward", party: "UDA", match: 92, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ali", manifesto: "My priority is improving access to clean water in all neighborhoods and expanding the local dispensary to operate 24/7 to serve mothers and children." },
  { id: "2", name: "Fatuma Juma", position: "MCA", level: "Ward", party: "ODM", match: 78, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Fatuma", manifesto: "I will establish a youth empowerment fund to support local startups and small businesses, and ensure fair distribution of county bursaries." },
  // Constituency Level
  { id: "3", name: "Omar Said", position: "MP", level: "Constituency", party: "Wiper", match: 88, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Omar", manifesto: "Focus on repairing the main constituency roads, increasing the CDF bursary allocation for high school students, and improving security." },
  { id: "4", name: "John Kamau", position: "MP", level: "Constituency", party: "UDA", match: 65, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=John", manifesto: "Enhancing security by installing street lights across all major wards and building a new technical college to equip youth with skills." },
  // County Level
  { id: "5", name: "Abdulswamad Nassir", position: "Governor", level: "County", party: "ODM", match: 95, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Abdulswamad", manifesto: "Comprehensive healthcare reform across the county, zero-rating licenses for small traders, and urban renewal programs for better housing." },
  { id: "6", name: "Mohammed Faki", position: "Senator", level: "County", party: "ODM", match: 81, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Mohammed", manifesto: "Strict oversight on county expenditure to ensure funds are directed towards education, sanitation, and job creation initiatives." },
  // National Level
  { id: "7", name: "William Ruto", position: "President", level: "National", party: "UDA", match: null, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=William", manifesto: "Bottom-up economic model focusing on agriculture, MSMEs, affordable housing, and universal healthcare coverage for all Kenyans." },
  { id: "8", name: "Raila Odinga", position: "President", level: "National", party: "ODM", match: null, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Raila", manifesto: "Social protection programs (Inua Jamii), rapid industrialization, and reforming the education sector for equal opportunity nationwide." },
];

export default function CitizenLandingPage() {
  const [locationInput, setLocationInput] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the VoteWise AI. Tell me what issues matter most to you (e.g. "I want better roads and jobs for youth"), and I will highlight candidates who align with your priorities based on their manifestos.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResolveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;
    
    setIsResolving(true);
    // Simulate backend API call
    setTimeout(() => {
      setIsResolving(false);
      setIsResolved(true);
    }, 1200);
  };

  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() && !attachedFile) return;
    
    let userMsg = chatInput;
    if (attachedFile) {
      userMsg = userMsg ? `${userMsg}\n[Attached: ${attachedFile.name}]` : `[Attached: ${attachedFile.name}]`;
    }

    const newMsg = { role: 'user', content: userMsg };
    setMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setAttachedFile(null);
    
    // Simulate AI response and highlighting logic
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I found some strong matches based on your interest in those topics! I have highlighted candidates with high match scores in the center feed. Their manifestos strongly align with your priorities.' }]);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-[1600px]">
      <AnimatePresence mode="wait">
        {!isResolved ? (
          <motion.div 
            key="location-prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Find Your Perfect Candidate Match
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Enter your location to discover and compare verified candidates running in your specific ward, constituency, and county.
              </p>
            </div>

            <div className="w-full max-w-md bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center">
              <div className="pl-4 text-slate-400">
                <MapPin className="w-6 h-6" />
              </div>
              <form onSubmit={handleResolveLocation} className="flex-1 flex">
                <input 
                  type="text" 
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Mwembe Tayari, Mombasa" 
                  className="w-full bg-transparent border-none p-4 text-lg focus:outline-none focus:ring-0 placeholder:text-slate-400 text-slate-900"
                />
                <button 
                  type="submit" 
                  disabled={isResolving || !locationInput.trim()}
                  className="m-2 rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center gap-2"
                >
                  {isResolving ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Search className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <span>Find</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="resolved-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Location Confirmation Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-5xl mx-auto">
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold text-sm tracking-wide uppercase">Location Resolved</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                  <span>{MOCK_LOCATION.ward}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">{MOCK_LOCATION.constituency}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">{MOCK_LOCATION.county}</span>
                </h2>
              </div>
              <button 
                onClick={() => setIsResolved(false)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"
              >
                Change Location
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
              
              {/* Left Column: Trending & Fact Checks (col-span-3) */}
              <div className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Important Events Countdown */}
                <CountdownWidget />

                {/* Trending Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 border-b p-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900">Trending Locally</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {MOCK_TRENDING.map(trend => (
                      <div key={trend.id} className="group cursor-pointer">
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm mb-1">{trend.topic}</h4>
                        <div className="flex gap-1.5">
                          {trend.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fact Checks Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 border-b p-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-slate-900">Recent Fact Checks</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {MOCK_FACT_CHECKS.map(check => (
                      <div key={check.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-sm text-slate-700 italic mb-2">"{check.claim}"</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-500">{check.candidate}</span>
                          <span className={`font-bold px-2 py-0.5 rounded ${check.verdict === 'TRUE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {check.verdict}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column: Candidate Hierarchy Feed (col-span-5) */}
              <div className="lg:col-span-5 space-y-8 pb-10">
                <div className="space-y-8 relative">
                  
                  <LevelSection 
                    title="Ward Candidates" 
                    subtitle={MOCK_LOCATION.ward} 
                    icon={<User className="w-5 h-5 text-emerald-600" />}
                    iconBg="bg-emerald-100"
                    candidates={MOCK_CANDIDATES.filter(c => c.level === 'Ward')} 
                    messagesLength={messages.length}
                  />
                  
                  <LevelSection 
                    title="Constituency Candidates" 
                    subtitle={MOCK_LOCATION.constituency} 
                    icon={<Building className="w-5 h-5 text-blue-600" />}
                    iconBg="bg-blue-100"
                    candidates={MOCK_CANDIDATES.filter(c => c.level === 'Constituency')} 
                    messagesLength={messages.length}
                  />
                  
                  <LevelSection 
                    title="County Candidates" 
                    subtitle={MOCK_LOCATION.county} 
                    icon={<Map className="w-5 h-5 text-purple-600" />}
                    iconBg="bg-purple-100"
                    candidates={MOCK_CANDIDATES.filter(c => c.level === 'County')} 
                    messagesLength={messages.length}
                  />

                  <LevelSection 
                    title="National Candidates" 
                    subtitle={MOCK_LOCATION.national} 
                    icon={<Flag className="w-5 h-5 text-amber-600" />}
                    iconBg="bg-amber-100"
                    candidates={MOCK_CANDIDATES.filter(c => c.level === 'National')} 
                    messagesLength={messages.length}
                  />
                </div>
              </div>

              {/* Right Column: Chat Interface (col-span-4) */}
              <div className="lg:col-span-4 flex flex-col bg-white rounded-2xl shadow-md border border-slate-200 h-[600px] lg:sticky lg:top-24 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
                  <h3 className="font-bold flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    VoteWise AI Matcher
                  </h3>
                  <p className="text-blue-100 text-xs mt-1">Chat to find candidates matching your values.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                      } whitespace-pre-wrap`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t bg-white flex flex-col gap-2">
                  {attachedFile && (
                    <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 px-3 py-1.5 rounded-lg self-start">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                      <button type="button" onClick={() => setAttachedFile(null)} className="ml-1 text-slate-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shrink-0"
                      title="Attach file"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your priorities... (Shift+Enter for new line)" 
                      className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-w-0 resize-none overflow-y-auto max-h-32"
                      rows={1}
                    />
                    <button 
                      type="submit" 
                      disabled={!chatInput.trim() && !attachedFile}
                      className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LevelSection({ title, subtitle, icon, iconBg, candidates, messagesLength }: { title: string, subtitle: string, icon: React.ReactNode, iconBg: string, candidates: any[], messagesLength: number }) {
  const isMatched = messagesLength > 1; // Simulate matching state if user has sent a message

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-none">{title}</h3>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 pl-2 sm:pl-5 border-l-2 border-slate-100 ml-5">
        {candidates.map(candidate => (
          <div key={candidate.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-300 transition-all">
            
            <div className="p-4 flex gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-slate-100 shrink-0 border border-slate-200 overflow-hidden relative">
                <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="truncate pr-2">
                    <h4 className="font-bold text-base text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                      {candidate.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                      <span className="font-semibold px-1.5 py-0.5 bg-slate-100 rounded text-slate-800">{candidate.party}</span>
                      <span>•</span>
                      <span className="truncate">{candidate.position}</span>
                    </div>
                  </div>
                  
                  {/* Match Score Badge (Appears when AI has responded) */}
                  <AnimatePresence>
                    {isMatched && candidate.match && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex flex-col items-end shrink-0`}
                      >
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                          candidate.match >= 85 ? 'bg-green-100 text-green-700 border border-green-200' :
                          candidate.match >= 70 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {candidate.match}% Match
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Manifesto Snippet */}
                <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 relative">
                  <div className="flex gap-1.5 items-start">
                    <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed line-clamp-2">
                      <span className="font-semibold text-slate-900 mr-1">Snapshot:</span>
                      "{candidate.manifesto}"
                    </p>
                  </div>
                </div>
                
                {/* Action Link */}
                <div className="mt-3 flex justify-end">
                  <Link href={`/candidates/${candidate.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Full Profile
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CountdownWidget() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-08-10T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-sm border border-blue-800 overflow-hidden text-white relative">
      <div className="absolute -top-4 -right-4 opacity-10">
        <Timer className="w-32 h-32" />
      </div>
      <div className="p-5 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-300" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-blue-100">
            Next General Election
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-black/30 rounded-lg py-2 backdrop-blur-md border border-white/10 shadow-inner">
            <div className="text-xl font-bold font-mono tracking-tight">{format(timeLeft.days)}</div>
            <div className="text-[9px] text-blue-200 uppercase tracking-widest mt-1 font-semibold">Days</div>
          </div>
          <div className="bg-black/30 rounded-lg py-2 backdrop-blur-md border border-white/10 shadow-inner">
            <div className="text-xl font-bold font-mono tracking-tight">{format(timeLeft.hours)}</div>
            <div className="text-[9px] text-blue-200 uppercase tracking-widest mt-1 font-semibold">Hrs</div>
          </div>
          <div className="bg-black/30 rounded-lg py-2 backdrop-blur-md border border-white/10 shadow-inner">
            <div className="text-xl font-bold font-mono tracking-tight">{format(timeLeft.mins)}</div>
            <div className="text-[9px] text-blue-200 uppercase tracking-widest mt-1 font-semibold">Min</div>
          </div>
          <div className="bg-black/30 rounded-lg py-2 backdrop-blur-md border border-white/10 shadow-inner">
            <div className="text-xl font-bold font-mono tracking-tight">{format(timeLeft.secs)}</div>
            <div className="text-[9px] text-blue-200 uppercase tracking-widest mt-1 font-semibold">Sec</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-blue-300 font-medium text-center bg-white/10 rounded px-2 py-1.5 backdrop-blur-sm">
          August 10, 2027
        </div>
      </div>
    </div>
  );
}
