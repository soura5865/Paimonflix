import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, Movie } from '../services/geminiService';
import MovieCard from '../components/MovieCard';
import { Loader2, Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError('Failed to search movies. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#0098ff] shadow-lg shadow-[#0098ff]/10">
          <SearchIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Search Results
          </h1>
          <p className="text-gray-400 mt-1">
            {query ? `Showing results for "${query}"` : 'Enter a search query to find movies and TV shows'}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#0098ff]" />
          <p>Searching the multiverse for "{query}"...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-8 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : movies.length === 0 && query ? (
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/5 p-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#222] flex items-center justify-center text-gray-500">
            <SearchIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white">No results found</h3>
          <p className="text-gray-400">We couldn't find anything matching "{query}". Try different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
