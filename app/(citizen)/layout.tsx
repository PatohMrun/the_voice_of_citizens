import Link from "next/link";
import { CheckCircle, Search, TrendingUp, AlertTriangle, UserCircle2, ShieldCheck } from "lucide-react";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              VoteWise
            </span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Search className="w-4 h-4" />
              Citizen Dashboard
            </Link>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Anonymous Session
            </div>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors pl-4 border-l border-slate-200"
            >
              <UserCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Portal</span>
            </Link>
          </div>

        </div>
      </header>
      
      <main className="flex-1 w-full">
        {children}
      </main>
      
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="container mx-auto px-4 max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1 rounded-md">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">VoteWise</span>
          </div>
          <p className="text-sm text-slate-500 font-medium text-center">
            Bridging the information gap between Kenyan citizens and electoral candidates.
          </p>
          <div className="text-sm text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
