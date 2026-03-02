import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Movie {
  id: string; // IMDB ID (e.g., tt1375666) or TMDB ID
  title: string;
  year: string;
  overview: string;
  posterUrl: string; // Full URL or placeholder
  type: 'movie' | 'tv';
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Search for popular movies or TV shows matching "${query}". Return a JSON array of up to 12 results. Each result must have: 'id' (IMDB ID as string, e.g., 'tt1375666'), 'title' (string), 'year' (string), 'overview' (a short 1-2 sentence summary), 'posterUrl' (a valid full image URL from TMDB or OMDB, or an empty string if unknown), 'type' (either 'movie' or 'tv'). Ensure the IMDB ID is accurate.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            year: { type: Type.STRING },
            overview: { type: Type.STRING },
            posterUrl: { type: Type.STRING },
            type: { type: Type.STRING }
          },
          required: ["id", "title", "year", "overview", "posterUrl", "type"]
        }
      }
    }
  });

  try {
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as Movie[];
  } catch (e) {
    console.error("Failed to parse movies", e);
    return [];
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Return a JSON array of 12 currently popular or trending movies and TV shows. Each result must have: 'id' (IMDB ID as string, e.g., 'tt1375666'), 'title' (string), 'year' (string), 'overview' (a short 1-2 sentence summary), 'posterUrl' (a valid full image URL from TMDB or OMDB, or an empty string if unknown), 'type' (either 'movie' or 'tv'). Ensure the IMDB ID is accurate.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            year: { type: Type.STRING },
            overview: { type: Type.STRING },
            posterUrl: { type: Type.STRING },
            type: { type: Type.STRING }
          },
          required: ["id", "title", "year", "overview", "posterUrl", "type"]
        }
      }
    }
  });

  try {
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as Movie[];
  } catch (e) {
    console.error("Failed to parse trending movies", e);
    return [];
  }
}
