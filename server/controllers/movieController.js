import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
  const movies = await Movie.find({ userId: req.userId });
  res.json(movies);
};

export const addMovie = async (req, res) => {
  const movie = await Movie.create({ ...req.body, userId: req.userId });
  res.status(201).json(movie);
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    if (movie.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Error updating movie:', error.message);
    res.status(500).json({ message: 'Server error while updating movie' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    if (movie.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    console.error('Error deleting movie:', error.message);
    res.status(500).json({ message: 'Server error while deleting movie' });
  }
};

export const getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error.message);
    res.status(500).json({ message: 'Server error while fetching movie' });
  }
};