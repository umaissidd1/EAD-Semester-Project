import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { moviesAPI } from "../services/api";
import { ArrowLeft, Film, Calendar, Tag } from "lucide-react";
import toast from "react-hot-toast";

const EditMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setFetchLoading(true);
        const response = await moviesAPI.getById(id);

        const movieData = response.data;
        setFormData({
          title: movieData.title || "",
          genre: movieData.genre || "",
          year: movieData.year || new Date().getFullYear(),
        });
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Failed to fetch movie details");
        navigate("/dashboard", { replace: true });
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "year" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title || !formData.genre || !formData.year) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      const updateData = {
        title: formData.title.trim(),
        genre: formData.genre,
        year: parseInt(formData.year),
      };

      await moviesAPI.update(id, updateData);
      toast.success("Movie updated successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Update error:", error);
      const message = error.response?.data?.message || "Failed to update movie";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
  ];

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Watchlist</span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Edit Movie</h1>
          <p className="text-gray-400">Update your movie information</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Movie Title
              </label>
              <div className="relative">
                <Film className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter movie title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Genre
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all"
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Release Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter release year"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating Movie..." : "Update Movie"}
              </button>

              <Link
                to="/dashboard"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
