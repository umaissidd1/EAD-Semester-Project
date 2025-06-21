import React from 'react';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex space-x-2 ml-4">
          <Link
            to={`/edit-movie/${movie._id}`}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(movie._id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-300">
          <Tag className="h-4 w-4 mr-2 text-purple-400" />
          <span className="capitalize">{movie.genre}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="h-4 w-4 mr-2 text-purple-400" />
          <span>{movie.year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;