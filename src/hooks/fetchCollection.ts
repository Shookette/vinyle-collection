import type { Collection, ItemType } from '../types/collection';

const DISCOG_BASE_URL = 'https://api.discogs.com'

export async function fetchSpecificUserCollection(user: string): Promise<Collection | null> {
  const response = await fetch(`${DISCOG_BASE_URL}/users/${user}/collection/folders/0/releases`)
  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function fetchNextCollectionPage(collection: Collection): Promise<Collection | null> {
  if (!collection.pagination.urls.next) {
    return null;
  }

  const response = await fetch(collection.pagination.urls.next)
  if (!response.ok) {
    return null
  }

  return response.json()
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

  return allItems
}

export async function fetchAllItemsForAllCollection() {
  const items = [];

  const collectLaureAnne = await fetchSpecificUserCollection('laureanne.leneel');
  if (collectLaureAnne) {
    const itemsLaureAnne = await fetchAllItemsFromACollection(collectLaureAnne);
    for (const item of itemsLaureAnne) {
      item.user_name = 'Laure-Anne';
      items.push(item)
    }
  }

  const collectJeremy = await fetchSpecificUserCollection('shookete');
  if (collectJeremy) {
    const itemsJeremy = await fetchAllItemsFromACollection(collectJeremy);
    for (const item of itemsJeremy) {
      item.user_name = 'Jeremy';
      items.push(item)
    }
  }

  return items.sort((a, b) => {
    const firstArtistA = a.basic_information.artists.at(0)?.name ?? '';
    const firstArtistB = b.basic_information.artists.at(0)?.name ?? '';

    if (firstArtistA < firstArtistB) {
      return -1
    }

    if (firstArtistA > firstArtistB) {
      return 1
    }

    return 0
  });
}