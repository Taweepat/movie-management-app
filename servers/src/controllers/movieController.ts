import { Request, Response } from 'express';
import * as moviesService from "../services/moviesServices";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await moviesService.getAllMovies();
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdMovies = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const movie = await moviesService.getMovieById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getByNameMovies = async (req: Request, res: Response) => {
  try {
    const { mname } = req.params as { mname: string };
    const movies = await moviesService.getMoviesByTitle(mname);
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, year, rating } = req.body;
    if (!title || !year || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMovie = await moviesService.createMovie(title, parseInt(year), rating);
    res.status(201).json(newMovie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, year, rating } = req.body;
    const updated = await moviesService.updateMovie(id, title, parseInt(year), rating);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await moviesService.deleteMovie(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};