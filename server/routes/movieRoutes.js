import express from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie, getMovieById } from '../controllers/movieController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(auth);
router.get('/', getMovies);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/:id', auth, getMovieById);

export default router;
