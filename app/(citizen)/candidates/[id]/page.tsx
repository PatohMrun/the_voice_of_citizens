export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="h-32 bg-blue-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="h-24 w-24 rounded-full bg-slate-200 border-4 border-white absolute -top-12"></div>
          <div className="mt-14">
            <h1 className="text-3xl font-bold">Candidate {id}</h1>
            <p className="text-slate-600 font-medium">Party Name • Position • Ward</p>
            
            <div className="mt-6 flex gap-2 border-b pb-4">
              <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">Overview</button>
              <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">Fact Checks</button>
              <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">Documents</button>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Top Campaign Goals</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>Improve local road infrastructure within 2 years.</li>
                <li>Increase youth employment through tech hubs.</li>
                <li>Upgrade healthcare facilities in the ward.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
