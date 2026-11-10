import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import type { ItemType } from "./types/collection";
import { fetchAllItemsForAllCollection } from "./hooks/fetchCollection";
import Item from "./components/Item/Item";
import Background from "./components/Background/Background";
import RandomModal from "./components/RandomModal/RandomModal";
import { useLoading } from "./context/LoadingContext";

const ALL = "tous";

const pickRandom = (items: ItemType[]): ItemType | undefined => items[Math.floor(Math.random() * items.length)];

function App() {
  const { setLoading } = useLoading();
  const [collections, setCollections] = useState<ItemType[]>([]);
  const [categorieSelected, setCategorieSelected] = useState<string>(ALL);
  const [randomItem, setRandomItem] = useState<ItemType | undefined>();

  const categories = useMemo(
    () => [...new Set(collections.flatMap((item) => item.basic_information.genres))].sort(),
    [collections],
  );

  const collectionsFiltered = useMemo(
    () =>
      categorieSelected === ALL
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

  // Tire un album au hasard parmi ceux affichés (donc en respectant le filtre).
  const openRandom = useCallback(() => setRandomItem(pickRandom(collectionsFiltered)), [collectionsFiltered]);
  const closeRandom = useCallback(() => setRandomItem(undefined), []);

  return (
    <>
      <Background />

      {/* Barre du haut "collante" en verre dépoli : le seul gros élément flouté de la page. */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Vinyle Collection</h1>
              <p className="text-xs text-white/60 sm:text-sm">
                {collectionsFiltered.length} album{collectionsFiltered.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={openRandom}
              disabled={collectionsFiltered.length === 0}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-white/90 active:scale-95 disabled:opacity-40"
            >
              🎲 Random
            </button>
          </div>

          {/* Filtre par genre : des "chips" qui défilent horizontalement sur mobile. */}
          <nav
            aria-label="Filtrer par genre"
            className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
          >
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {[ALL, ...categories].map((categorie) => {
                const active = categorie === categorieSelected;
                return (
                  <button
                    key={categorie}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategorieSelected(categorie)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    {categorie === ALL ? "Tous" : categorie}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Grille de pochettes : 2 colonnes sur téléphone, jusqu'à 6 sur grand écran. */}
      <main className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-6 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {collectionsFiltered.map((collection) => (
          <Item key={`${collection.id}-${collection.user_name}`} item={collection} />
        ))}
      </main>

      {randomItem && <RandomModal item={randomItem} onClose={closeRandom} onReroll={openRandom} />}
    </>
  );
}

export default App;
