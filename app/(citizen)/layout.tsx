import Link from "next/link";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            VoteWise
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/trending" className="hover:text-blue-600 transition-colors">Trending</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} VoteWise. Civic Engagement Platform.
        </div>
      </footer>
    </div>
  );
}
