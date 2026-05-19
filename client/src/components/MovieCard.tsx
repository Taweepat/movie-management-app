import { observer } from "mobx-react-lite";
import type { Movie } from "../models/movieModel";
import { useStore } from "../hooks/useStore";
import { Trash2, Pencil } from "lucide-react";

const ratingColors: Record<string, string> = {
  G: "bg-green-100 text-green-800",
  PG: "bg-yellow-100 text-yellow-800",
  M: "bg-orange-100 text-orange-800",
  MA: "bg-red-100 text-red-800",
  R: "bg-red-200 text-red-900",
};

export const MovieCard = observer(function MovieCard({ movie }: { movie: Movie }) {
  const { movieStore, isManager } = useStore();
  const { deleteMovie, loading } = movieStore;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {movie.title}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">{movie.year}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                ratingColors[movie.rating] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {movie.rating}
            </span>
          </div>
        </div>

        {isManager && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => movieStore.startEdit(movie)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit movie"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => deleteMovie(movie.id)}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete movie"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
