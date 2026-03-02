import React, { useEffect, useState } from 'react';
import { getTrendingMovies, Movie } from '../services/geminiService';
import MovieCard from '../components/MovieCard';
import { Loader2, TrendingUp, Sparkles } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrending() {
      try {
        setIsLoading(true);
        const results = await getTrendingMovies();
        setMovies(results);
      } catch (err) {
        setError('Failed to load trending movies. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrending();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1a1a1a] border border-white/5 p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0098ff]/10 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0098ff]/20 blur-3xl rounded-full mix-blend-screen opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0098ff]/10 blur-3xl rounded-full mix-blend-screen opacity-50" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0098ff]/10 text-[#0098ff] text-sm font-medium border border-[#0098ff]/20">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Watch anywhere. Cancel anytime. Discover your next favorite story with Paimonflix.
          </p>
        </div>
      </section>

      {/* Trending Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#0098ff]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Trending Now</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#0098ff]" />
            <p>Curating the best content for you...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="rounded-2xl bg-[#1a1a1a] border border-white/5 p-12 text-center">
            <p className="text-gray-400">No trending movies found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
