import React, { useState, useEffect } from 'react';
import { Film, AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async (query: string = searchTerm) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=68afd1d5`
      );
      const data: SearchResponse = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.imdbID);
  };

  const handleCloseDetail = () => {
    setSelectedMovieId(null);
  };

  // Search popular movies on initial load
  useEffect(() => {
    searchMovies('marvel');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MovieSearch
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover movies, TV series, and episodes from the world's largest movie database
            </p>
          </div>
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={() => searchMovies()}
            isLoading={loading}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Searching for movies...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 font-semibold mb-2">Search Error</p>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {hasSearched && searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}
              </h2>
              <span className="text-gray-400">
                {movies.length} result{movies.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie} 
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && movies.length === 0 && hasSearched && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Film className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No movies found</p>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          </div>
        )}
      </main>

      {/* Movie Detail Modal */}
      {selectedMovieId && (
        <MovieDetail 
          movieId={selectedMovieId} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;