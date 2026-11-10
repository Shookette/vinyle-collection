import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { ItemType } from "./types/collection";
import { fetchAllItemsForAllCollection } from "./hooks/fetchCollection";
import Item from "./components/Item/Item";
import Background from "./components/Background/Background";
import GenreFilter from "./components/GenreFilter/GenreFilter";
import { useLoading } from "./context/LoadingContext";
import { useRandom } from "./context/RandomContext";

function App() {
  const { setLoading } = useLoading();
  const [collections, setCollections] = useState<ItemType[]>([]);
  const { showRandom } = useRandom();
  const [categorieSelected, setCategorieSelected] = useState<string | undefined>();

  const categories = useMemo(
    () => [...new Set(collections.flatMap((item) => item.basic_information.genres))].sort(),
    [collections],
  );

  const collectionsFiltered = useMemo(
    () =>
      categorieSelected === undefined
        ? collections
        : collections.filter((item) => item.basic_information.genres.includes(categorieSelected)),
    [collections, categorieSelected],
  );

  useEffect(() => {
    setLoading(true);
    fetchAllItemsForAllCollection()
      .then((data) => setCollections(data))
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <>
      <Background />

      {/* Barre du haut "collante" en verre dépoli : le seul gros élément flouté de la page. */}
      <header className="sticky top-0 z-30 border-b border-glass-border bg-glass backdrop-blur-glass">
        <div className="mx-auto flex max-w-page flex-col gap-3 px-gutter py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Vinyle Collection</h1>
              <p className="text-xs text-fg-subtle sm:text-sm">
                {collectionsFiltered.length} album{collectionsFiltered.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              // Tire un album parmi ceux affichés, donc en respectant le filtre.
              onClick={() => showRandom(collectionsFiltered)}
              disabled={collectionsFiltered.length === 0}
              className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-lg shadow-shadow transition hover:bg-primary-hover active:scale-95 disabled:opacity-40"
            >
              🎲 Random
            </button>
          </div>

          <GenreFilter genres={categories} selected={categorieSelected} onSelect={setCategorieSelected} />
        </div>
      </header>

      {/* Grille de pochettes : 2 colonnes sur téléphone, jusqu'à 6 sur grand écran. */}
      <main className="mx-auto grid max-w-page grid-cols-2 gap-x-4 gap-y-6 px-gutter py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {collectionsFiltered.map((collection) => (
          <Item key={`${collection.id}-${collection.user_name}`} item={collection} />
        ))}
      </main>
    </>
  );
}

export default App;
