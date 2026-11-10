import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ItemType } from "../types/collection";

type RandomContextType = {
  randomItem: ItemType | undefined;
  showRandom: (items: ItemType[]) => void;
  reroll: () => void;
  closeRandom: () => void;
};

const RandomContext = createContext<RandomContextType>({
  randomItem: undefined,
  showRandom: () => null,
  reroll: () => null,
  closeRandom: () => null,
});

const pickRandom = (items: ItemType[]): ItemType | undefined => items[Math.floor(Math.random() * items.length)];

// Garde l'album tiré au hasard. La modale est ouverte tant que randomItem est défini.
export function RandomProvider({ children }: { children: ReactNode }) {
  const [pool, setPool] = useState<ItemType[]>([]);
  const [randomItem, setRandomItem] = useState<ItemType | undefined>();

  // On mémorise la liste dans laquelle on a tiré, pour que "Un autre" respecte le même filtre.
  const showRandom = useCallback((items: ItemType[]) => {
    setPool(items);
    setRandomItem(pickRandom(items));
  }, []);

  const reroll = useCallback(() => {
    setRandomItem(pickRandom(pool));
  }, [pool]);

  const closeRandom = useCallback(() => {
    setRandomItem(undefined);
  }, []);

  return (
    <RandomContext.Provider value={{ randomItem, showRandom, reroll, closeRandom }}>{children}</RandomContext.Provider>
  );
}

export function useRandom() {
  return useContext(RandomContext);
}
