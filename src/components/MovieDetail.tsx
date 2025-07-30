import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Star, Globe, Award, Users } from 'lucide-react';

interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  BoxOffice?: string;
}

interface MovieDetailProps {
  movieId: string;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=68afd1d5&plot=full`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-white mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md">
          <p className="text-white text-center">{error || 'Movie not found'}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=400&h=600&fit=crop'}
                alt={movie.Title}
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>
            
            <div className="lg:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{movie.Title}</h1>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {movie.Year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.Runtime}
                    </div>
                    <span className="px-2 py-1 bg-blue-500 rounded text-xs font-semibold">
                      {movie.Rated}
                    </span>
                  </div>
                </div>
                
                {movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{movie.imdbRating}</span>
                    <span className="text-sm">({movie.imdbVotes} votes)</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Genre</h4>
                    <p className="text-gray-300 text-sm">{movie.Genre}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Director</h4>
                    <p className="text-gray-300 text-sm">{movie.Director}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Cast
                    </h4>
                    <p className="text-gray-300 text-sm">{movie.Actors}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      Language
                    </h4>
                    <p className="text-gray-300 text-sm">{movie.Language}</p>
                  </div>
                </div>
                
                {movie.Awards !== 'N/A' && (
                  <div>
                    <h4 className="text-white font-semibold mb-1 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Awards
                    </h4>
                    <p className="text-gray-300 text-sm">{movie.Awards}</p>
                  </div>
                )}
                
                {movie.BoxOffice && (
                  <div>
                    <h4 className="text-white font-semibold mb-1">Box Office</h4>
                    <p className="text-gray-300 text-sm">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;