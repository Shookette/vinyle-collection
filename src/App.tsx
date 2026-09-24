import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import type { ItemType } from "./types/collection";
import { fetchAllItemsForAllCollection } from "./hooks/fetchCollection";
import Item from "./components/Item/Item";

const randomFunction = (items: ItemType[]): void => {
  if (!items || items.length === 0) {
    return;
  }

  const randomItem = items[Math.floor(Math.random() * items.length)];
  alert(`${randomItem.basic_information.title} - ${randomItem.basic_information.artists.at(0)?.name}`);
};

function App() {
  const [collections, setCollections] = useState<ItemType[]>([]);
  const [categorieSelected, setCategorieSelected] = useState<string | undefined>();
  const categories = useMemo(
    () => [...new Set(collections.flatMap((item) => item.basic_information.genres))],
    [collections],
  );

  const collectionsFiltered = useMemo(
    () =>
      collections.filter((item) => {
        if (!categorieSelected) {
          return true;
        }

        return item.basic_information.genres.includes(categorieSelected);
      }),
    [collections, categorieSelected],
  );

  useEffect(() => {
    fetchAllItemsForAllCollection().then((data) => setCollections(data));
  }, []);

  const randomItem = useCallback(() => {
    randomFunction(collectionsFiltered);
  }, [collectionsFiltered]);

  return (
    <>
      <h1 className="text-sky-700 text-6xl text-center">Vinyle Collection</h1>
      <button className="rounded-none bg-sky-500 px-4 py-2 text-sm font-semibold text-white" onClick={randomItem}>
        Random
      </button>
      <div className="flex">
        <>
          <button
            key="categorie-tous"
            className="rounded-none bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setCategorieSelected(undefined)}
          >
            Tous
          </button>
          {categories.map((categorie) => (
            <button
              key={categorie}
              className="rounded-none bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setCategorieSelected(categorie)}
            >
              {categorie}
            </button>
          ))}
        </>
      </div>
      <div className="flex flex-wrap">
        {collectionsFiltered.map((collection) => (
          <Item key={`${collection.id}-${collection.user_name}`} item={collection} />
        ))}
      </div>
    </>
  );
}

export default App;
