import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Info, Tv, Server } from 'lucide-react';

const SERVERS = [
  { id: 'autoembed', name: 'AutoEmbed' },
  { id: 'vidsrc', name: 'VidSrc' },
  { id: 'vidsrcpro', name: 'VidSrc Pro' },
  { id: 'vidsrcvip', name: 'VidSrc VIP' },
  { id: 'vidsrccc', name: 'VidSrc CC' },
  { id: 'superembed', name: 'SuperEmbed' },
  { id: 'vidlink', name: 'VidLink' },
  { id: 'smashystream', name: 'SmashyStream' },
  { id: 'embedsu', name: 'Embed.su' },
  { id: 'vidbinge', name: 'VidBinge' },
  { id: 'nontongo', name: 'NontonGo' }
];

export default function Player() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [selectedServer, setSelectedServer] = useState(SERVERS[0].id);

  if (!id || !type) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-2xl font-bold text-white">Invalid Media</h2>
        <p>The requested media could not be found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded-full bg-[#1a1a1a] text-white hover:bg-[#222] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const getEmbedUrl = () => {
    switch (selectedServer) {
      case 'vidsrc':
        return type === 'movie' 
          ? `https://vidsrc.me/embed/movie?tmdb=${id}`
          : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      case 'vidsrcpro':
        return type === 'movie' 
          ? `https://vidsrc.pro/embed/movie/${id}`
          : `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`;
      case 'vidsrcvip':
        return type === 'movie' 
          ? `https://vidsrc.vip/embed/movie/${id}`
          : `https://vidsrc.vip/embed/tv/${id}/${season}/${episode}`;
      case 'vidsrccc':
        return type === 'movie' 
          ? `https://vidsrc.cc/v2/embed/movie/${id}`
          : `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
      case 'superembed':
        return type === 'movie'
          ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
          : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      case 'vidlink':
        return type === 'movie'
          ? `https://vidlink.pro/movie/${id}`
          : `https://vidlink.pro/tv/${id}/${season}/${episode}`;
      case 'smashystream':
        return type === 'movie'
          ? `https://player.smashy.stream/movie?tmdb=${id}`
          : `https://player.smashy.stream/tv?tmdb=${id}&s=${season}&e=${episode}`;
      case 'embedsu':
        return type === 'movie'
          ? `https://embed.su/embed/movie/${id}`
          : `https://embed.su/embed/tv/${id}/${season}/${episode}`;
      case 'vidbinge':
        return type === 'movie'
          ? `https://vidbinge.dev/embed/movie/${id}`
          : `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`;
      case 'nontongo':
        return type === 'movie'
          ? `https://www.nontongo.win/embed/movie/${id}`
          : `https://www.nontongo.win/embed/tv/${id}/${season}/${episode}`;
      case 'autoembed':
      default:
        return type === 'movie' 
          ? `https://player.autoembed.cc/embed/movie/${id}`
          : `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`;
    }
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/10 text-gray-300 hover:text-white hover:bg-[#222] transition-all group w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0098ff]/10 text-[#0098ff] text-sm font-medium border border-[#0098ff]/20 w-fit">
          <Info className="w-4 h-4" />
          <span>Use an adblocker for the best experience</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-white/5">
        <div className="flex items-center gap-2 text-[#0098ff] font-medium">
          <Server className="w-5 h-5" />
          <span>Stream Controls</span>
        </div>
        
        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-400">Server</label>
          <select 
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0098ff]/50"
          >
            {SERVERS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {type === 'tv' && (
          <>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-400">Season</label>
              <select 
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0098ff]/50"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(s => (
                  <option key={s} value={s}>Season {s}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-400">Episode</label>
              <select 
                value={episode}
                onChange={(e) => setEpisode(Number(e.target.value))}
                className="bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0098ff]/50"
              >
                {Array.from({ length: 50 }, (_, i) => i + 1).map(e => (
                  <option key={e} value={e}>Episode {e}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl shadow-[#0098ff]/5">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          title="Video Player"
          referrerPolicy="origin"
        ></iframe>
      </div>
    </div>
  );
}
