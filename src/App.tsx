import { useCallback, useEffect, useState } from 'react'
import './App.css'
import type { ItemType } from './types/collection';
import { fetchAllItemsForAllCollection } from './hooks/fetchCollection';
import Item from './components/Item/Item';


const randomFunction = (items: ItemType[]): void => {
  if (!items || items.length === 0) {
    return;
  }

  const randomItem = items[Math.floor(Math.random() * items.length)]
  alert(`${randomItem.basic_information.title} - ${randomItem.basic_information.artists.at(0)?.name}`);
}

function App() {
  const [collections, setCollections] = useState<ItemType[]>([]);

  useEffect(() => {
    fetchAllItemsForAllCollection().then((data) => setCollections(data))
  }, [])

  const randomItem = useCallback(() => {
    randomFunction(collections)
  }, [collections])

  return (<>
    <h1 className='text-sky-700 text-6xl text-center'>Vinyle Collection</h1>
    <button className="rounded-none bg-sky-500 px-4 py-2 text-sm font-semibold text-white" onClick={randomItem}> random</button>
    <div className="flex flex-wrap">
      {collections.map((collection) => <Item key={collection.id} item={collection} />)}
    </div>
  </>)
}

export default App
