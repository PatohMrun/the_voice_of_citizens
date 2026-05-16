export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Trending Topics</h1>
      <p className="text-slate-600 mb-8">What citizens are talking about in your area.</p>
      
      <div className="grid gap-4">
        {/* Placeholder for trending topics */}
        <div className="rounded-xl bg-white p-5 shadow-sm border">
          <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">County Level</div>
          <h3 className="text-lg font-semibold mb-2">Healthcare Funding</h3>
          <p className="text-sm text-slate-600">
            Increased discussion around the proposed budget cuts to local dispensaries.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">#Healthcare</span>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">#Budget2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
