import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./hooks/useStore";
import { RoleSelector, MovieForm, MovieList, EditMovieModal } from "./components";
import { Film } from "lucide-react";

const AppContent = observer(function AppContent() {
  const { movieStore, currentUserRole } = useStore();

  useEffect(() => {
    movieStore.fetchMovies();
  }, [currentUserRole]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Film size={22} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Movie Management
            </h1>
          </div>
          <RoleSelector />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <MovieForm />
        <MovieList />
      </main>

      <EditMovieModal />
    </div>
  );
});

export default AppContent;
