import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, Play, Menu, X } from 'lucide-react';
import React, { useState } from 'react';

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#bbb] font-sans selection:bg-[#0098ff]/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#111]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-[#0098ff] flex items-center justify-center text-white group-hover:bg-[#007bff] transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                  Paimon<span className="text-[#0098ff]">flix</span>
                </span>
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md ml-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0098ff]/50 focus:border-[#0098ff]/50 sm:text-sm transition-all"
                  placeholder="Search movies, TV shows..."
                />
              </form>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1a1a1a] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#111]">
            <div className="px-4 pt-4 pb-6 space-y-1">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0098ff]/50 sm:text-sm"
                  placeholder="Search movies, TV shows..."
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto py-8 text-center text-[#bbb] text-sm">
        <p>Paimonflix does not host any files on its server. All contents are provided by non-affiliated third parties.</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Paimonflix. All rights reserved.</p>
      </footer>
    </div>
  );
}
