import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { MovieCard } from "./MovieCard";
import { Film } from "lucide-react";

export const MovieList = observer(function MovieList() {
  const { movieStore } = useStore();
  const { movies, loading, error } = movieStore;

  if (loading && movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <Film size={48} className="mb-3" />
        <p className="text-lg font-medium">No movies yet</p>
        <p className="text-sm">Add your first movie above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
});
