"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, ChevronRight, CheckCircle2, User, Building, Map, Flag } from 'lucide-react';
import Link from 'next/link';

// Mock data to simulate the backend resolution
const MOCK_LOCATION = {
  ward: "Mwembe Tayari",
  constituency: "Mvita",
  county: "Mombasa",
  national: "Kenya"
};

const MOCK_CANDIDATES = [
  // Ward Level
  { id: "1", name: "Ali Hassan", position: "MCA", level: "Ward", party: "Party A", match: 92 },
  { id: "2", name: "Fatuma Juma", position: "MCA", level: "Ward", party: "Party B", match: 78 },
  // Constituency Level
  { id: "3", name: "Omar Said", position: "MP", level: "Constituency", party: "Party C", match: 88 },
  { id: "4", name: "John Kamau", position: "MP", level: "Constituency", party: "Party A", match: 65 },
  // County Level
  { id: "5", name: "Abdulswamad Nassir", position: "Governor", level: "County", party: "Party B", match: 95 },
  { id: "6", name: "Mohammed Faki", position: "Senator", level: "County", party: "Party B", match: 81 },
  // National Level
  { id: "7", name: "William Ruto", position: "President", level: "National", party: "UDA", match: 50 },
  { id: "8", name: "Raila Odinga", position: "President", level: "National", party: "ODM", match: 50 },
];

export default function CitizenLandingPage() {
  const [locationInput, setLocationInput] = useState("");
  const [isResolved, setIsResolved] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
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
            className="space-y-12"
          >
            {/* Location Confirmation Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold text-sm tracking-wide uppercase">Location Resolved</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
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

            {/* AI Preference Prompt (Optional) */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find candidates that match your values
              </h3>
              <p className="text-blue-100 mb-4 text-sm md:text-base">
                Type in what matters most to you (e.g. "I want better roads and youth jobs"), and our AI will rank the candidates below based on their verified manifestos.
              </p>
              <form action="/match" className="flex gap-2 bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
                <input 
                  type="text" 
                  placeholder="What are your top priorities?" 
                  className="flex-1 bg-transparent border-none p-3 text-white placeholder:text-blue-200 focus:outline-none focus:ring-0"
                />
                <button type="submit" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Match Me
                </button>
              </form>
            </div>

            {/* Candidate Hierarchy */}
            <div className="space-y-10 relative">
              <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-slate-200 hidden md:block rounded-full"></div>
              
              <LevelSection 
                title="Ward Candidates" 
                subtitle={MOCK_LOCATION.ward} 
                icon={<User className="w-6 h-6 text-emerald-600" />}
                iconBg="bg-emerald-100"
                candidates={MOCK_CANDIDATES.filter(c => c.level === 'Ward')} 
              />
              
              <LevelSection 
                title="Constituency Candidates" 
                subtitle={MOCK_LOCATION.constituency} 
                icon={<Building className="w-6 h-6 text-blue-600" />}
                iconBg="bg-blue-100"
                candidates={MOCK_CANDIDATES.filter(c => c.level === 'Constituency')} 
              />
              
              <LevelSection 
                title="County Candidates" 
                subtitle={MOCK_LOCATION.county} 
                icon={<Map className="w-6 h-6 text-purple-600" />}
                iconBg="bg-purple-100"
                candidates={MOCK_CANDIDATES.filter(c => c.level === 'County')} 
              />

              <LevelSection 
                title="National Candidates" 
                subtitle={MOCK_LOCATION.national} 
                icon={<Flag className="w-6 h-6 text-amber-600" />}
                iconBg="bg-amber-100"
                candidates={MOCK_CANDIDATES.filter(c => c.level === 'National')} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LevelSection({ title, subtitle, icon, iconBg, candidates }: { title: string, subtitle: string, icon: React.ReactNode, iconBg: string, candidates: any[] }) {
  return (
    <div className="relative flex flex-col md:flex-row gap-6">
      {/* Timeline Node */}
      <div className="hidden md:flex flex-col items-center z-10 w-14 pt-2">
        <div className={`w-14 h-14 rounded-full ${iconBg} border-4 border-white flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="mb-4 flex items-center gap-3 md:block">
          <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center md:hidden shrink-0`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{subtitle}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map(candidate => (
            <Link href={`/candidates/${candidate.id}`} key={candidate.id} className="group">
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300 h-full flex gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0 border border-slate-200 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <User className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{candidate.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-xs">{candidate.party}</span>
                    <span>•</span>
                    <span>{candidate.position}</span>
                  </div>
                  {/* Optional match score if AI prompt was used - currently showing placeholder */}
                  {/* 
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    {candidate.match}% Match
                  </div>
                  */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
