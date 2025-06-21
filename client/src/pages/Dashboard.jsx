import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { moviesAPI } from "../services/api";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import { Plus, Search, Film } from "lucide-react";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await moviesAPI.getAll();
        setMovies(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        } else {
          toast.error("Failed to fetch movies");
        }
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchMovies();
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const handleDeleteMovie = async (id) => {
    try {
      await moviesAPI.delete(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      toast.success("Movie deleted successfully");
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      (movie.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (movie.genre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (movie.year?.toString() || "").includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
            <p className="text-gray-400">
              {movies.length} {movies.length === 1 ? "movie" : "movies"} in your
              collection
            </p>
          </div>

          <Link
            to="/add-movie"
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Movie</span>
          </Link>
        </div>

        {movies.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              />
            </div>
          </div>
        )}

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {movies.length === 0
                ? "No movies in your watchlist yet"
                : "No movies found"}
            </h3>
            <p className="text-gray-500 mb-6">
              {movies.length === 0
                ? "Start building your movie collection by adding your first movie!"
                : "Try adjusting your search terms or browse all movies."}
            </p>
            {movies.length === 0 && (
              <Link
                to="/add-movie"
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Movie</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
