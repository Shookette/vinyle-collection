import type { Collection, ItemType } from "../types/collection";
import { appConfig } from "../config";

export async function fetchSpecificUserCollection(user: string): Promise<Collection | null> {
  const response = await fetch(`${appConfig.discogsBaseUrl}/users/${encodeURIComponent(user)}/collection/folders/0/releases`);
  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function fetchNextCollectionPage(collection: Collection): Promise<Collection | null> {
  if (!collection.pagination.urls.next) {
    return null;
  }

  const response = await fetch(collection.pagination.urls.next);
  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function fetchAllItemsFromACollection(collection: Collection): Promise<ItemType[]> {
  const hasAlreadyFetchAllData = collection.pagination.items < collection.pagination.per_page;
  const allItems = collection.releases;

  if (hasAlreadyFetchAllData) {
    return allItems;
  }

  let hasNext = true;
  let next = collection;
  while (hasNext) {
    const nextCollection = await fetchNextCollectionPage(next);
    if (nextCollection === null) {
      hasNext = false;
      continue;
    }

    next = nextCollection;
    allItems.push(...nextCollection.releases);
  }

  return allItems;
}

export async function fetchAllItemsForAllCollection() {
  const items: ItemType[] = [];

  for (const { username, label } of appConfig.collections) {
    const collection = await fetchSpecificUserCollection(username);
    if (!collection) {
      continue;
    }

    const userItems = await fetchAllItemsFromACollection(collection);
    for (const item of userItems) {
      item.user_name = label;
      items.push(item);
    }
  }

  return items.sort((a, b) => {
    const firstArtistA = a.basic_information.artists.at(0)?.name ?? "";
    const firstArtistB = b.basic_information.artists.at(0)?.name ?? "";

    if (firstArtistA < firstArtistB) {
      return -1;
    }

    if (firstArtistA > firstArtistB) {
      return 1;
    }

    return 0;
  });
}
