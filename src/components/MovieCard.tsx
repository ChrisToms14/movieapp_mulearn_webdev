import React from 'react';
import { Calendar, Star, Film } from 'lucide-react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbRating?: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=300&h=450&fit=crop';
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'movie':
        return 'bg-blue-500';
      case 'series':
        return 'bg-green-500';
      case 'episode':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="group cursor-pointer bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=300&h=450&fit=crop'}
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold text-white ${getTypeColor(movie.Type)}`}>
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
        </div>
        {movie.imdbRating && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {movie.imdbRating}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
          {movie.Title}
        </h3>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.Year}
          </div>
          <div className="flex items-center gap-1">
            <Film className="w-4 h-4" />
            {movie.Type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;