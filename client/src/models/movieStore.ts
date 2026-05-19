import { types, flow} from "mobx-state-tree";
import { MovieModel } from "./movieModel";
import { movieService } from "../services/movieService";

export const MovieStore = types
  .model("MovieStore", {
    movies: types.array(MovieModel),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
    editingMovie: types.maybeNull(types.reference(MovieModel)),
  })
  .views((self) => ({
    get isEditing() {
      return self.editingMovie !== null;
    },
  }))
  .actions((self) => ({
    startEdit(movie: typeof MovieModel.Type) {
      self.editingMovie = movie;
    },
    cancelEdit() {
      self.editingMovie = null;
    },
    fetchMovies: flow(function* () {
      self.loading = true;
      self.error = null;
      try {
        const data = yield movieService.getAll();
        self.movies.replace(data);
      } catch (err: any) {
        self.error = err.message || "Failed to fetch movies";
      } finally {
        self.loading = false;
      }
    }),

    addMovie: flow(function* (title: string, year: number, rating: string) {
      self.loading = true;
      self.error = null;
      try {
        const newMovie = yield movieService.create({ title, year, rating });
        self.movies.push(newMovie);
      } catch (err: any) {
        self.error = err.message || "Failed to add movie";
      } finally {
        self.loading = false;
      }
    }),

    updateMovie: flow(function* (id: number, title: string, year: number, rating: string) {
      self.loading = true;
      self.error = null;
      try {
        const updated = yield movieService.update(id, { title, year, rating });
        const idx = self.movies.findIndex((m) => m.id === id);
        if (idx >= 0) self.movies[idx] = updated;
      } catch (err: any) {
        self.error = err.message || "Failed to update movie";
      } finally {
        self.loading = false;
      }
    }),

    deleteMovie: flow(function* (id: number) {
      self.loading = true;
      self.error = null;
      try {
        yield movieService.remove(id);
        const idx = self.movies.findIndex((m) => m.id === id);
        if (idx >= 0) self.movies.splice(idx, 1);
      } catch (err: any) {
        self.error = err.message || "Failed to delete movie";
      } finally {
        self.loading = false;
      }
    }),

    searchMovies: flow(function* (query: string) {
      self.loading = true;
      self.error = null;
      try {
        const data = yield movieService.search(query);
        self.movies.replace(data);
      } catch (err: any) {
        self.error = err.message || "Failed to search movies";
      } finally {
        self.loading = false;
      }
    }),
  }));
