export default function MatchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Your Candidate Matches</h1>
      <p className="text-slate-600 mb-8">Based on your preferences and location.</p>
      
      <div className="space-y-4">
        {/* Placeholder for candidate match cards */}
        <div className="rounded-xl bg-white p-6 shadow-sm border flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 shrink-0"></div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Candidate Name</h3>
                <p className="text-sm text-slate-500">Party Name • Position</p>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                95% Match
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Aligns with your priorities on healthcare and infrastructure...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
