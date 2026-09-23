import type { FC } from "react";
import type { ItemType } from "../../types/collection";

type ItemProps = {
  item: ItemType;
};

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl basis-1/3">
      <div>
        <img
          className="size-48 shadow-xl rounded-md"
          alt="album cover"
          src={item.basic_information.cover_image}
        />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="text-2xl font-medium">{item.basic_information.title}</span>
        <span className="font-medium text-sky-500">
          {item.basic_information.artists
            .map((artist) => artist.name)
            .join(", ")}
        </span>
        <div className="flex flex-row gap-2 font-medium text-gray-600 dark:text-gray-400">
          <p>
            {item.basic_information.genres.map((genre) => genre).join(", ")}
          </p>
          <p>·</p>
          <p>{item.basic_information.year}</p>
        </div>
        <div className="text-indigo-300">Collection de {item.user_name}</div>
      </div>
    </div>
  );
};

export default Item;
