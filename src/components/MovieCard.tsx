import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Film, Tv } from 'lucide-react';
import { Movie } from '../services/geminiService';

interface MovieCardProps {
  movie: Movie;
  key?: string | number;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const isMovie = movie.type === 'movie';
  
  // Use metahub for IMDB IDs if posterUrl is not provided or fails
  const defaultPoster = movie.id?.startsWith('tt') 
    ? `https://images.metahub.space/poster/medium/${movie.id}/img`
    : movie.posterUrl;

  return (
    <Link
      to={`/watch/${movie.type}/${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all hover:border-[#0098ff]/50 hover:shadow-lg hover:shadow-[#0098ff]/10 focus:outline-none focus:ring-2 focus:ring-[#0098ff]"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-[#222] relative">
        <img
          src={movie.posterUrl || defaultPoster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== defaultPoster && defaultPoster) {
              target.src = defaultPoster;
            } else {
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }
          }}
        />
        
        {/* Fallback poster */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#222] hidden">
          {isMovie ? <Film className="w-12 h-12 text-gray-600 mb-4" /> : <Tv className="w-12 h-12 text-gray-600 mb-4" />}
          <span className="font-medium text-gray-400 line-clamp-3">{movie.title}</span>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 scale-90 group-hover:scale-100">
          <div className="w-16 h-16 rounded-full bg-[#0098ff]/90 flex items-center justify-center text-white shadow-xl backdrop-blur-sm">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <span className="inline-flex items-center rounded-md bg-[#111]/80 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-white/10 backdrop-blur-md">
            {movie.year}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#0098ff]/20 px-2 py-1 text-xs font-medium text-[#0098ff] ring-1 ring-inset ring-[#0098ff]/30 backdrop-blur-md uppercase tracking-wider">
            {isMovie ? <Film className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
            {movie.type}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-gray-100 line-clamp-1 group-hover:text-[#0098ff] transition-colors">
            {movie.title}
          </h3>
          <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
