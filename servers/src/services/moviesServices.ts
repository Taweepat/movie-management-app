import { PrismaClient, Movie } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

export const getAllMovies = async (): Promise<Movie[]> => {
  return await prisma.movie.findMany({
    orderBy: { id: 'asc' }
  });
};

export const getMovieById = async (id: number): Promise<Movie | null> => {
  return await prisma.movie.findUnique({
    where: { id }
  });
};

export const getMoviesByTitle = async (title: string): Promise<Movie[]> => {
  return await prisma.movie.findMany({
    where: {
      title: { contains: title }
    }
  });
};

export const createMovie = async (title: string, year: number, rating: string): Promise<Movie> => {
  return await prisma.movie.create({
    data: { title, year, rating }
  });
};

export const updateMovie = async (id: number, title: string, year: number, rating: string): Promise<Movie> => {
  return await prisma.movie.update({
    where: { id },
    data: { title, year, rating }
  });
};

export const deleteMovie = async (id: number): Promise<Movie> => {
  return await prisma.movie.delete({
    where: { id }
  });
};