import type { FC } from "react";
import type { ItemType } from "../../types/collection";

type ItemProps = {
  item: ItemType;
};

// Une carte d'album : la pochette carrée, puis titre, artistes et année.
// Pas de verre dépoli ici : le flou coûte cher quand il y a des centaines de cartes.
const Item: FC<ItemProps> = ({ item }) => {
  const { title, artists, year, cover_image } = item.basic_information;
  const artistNames = artists.map((artist) => artist.name).join(", ");

  return (
    <article className="group flex flex-col gap-2">
      <img
        className="aspect-square w-full rounded-xl object-cover shadow-lg shadow-black/40 ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
        alt={`Pochette de ${title}`}
        src={cover_image}
        loading="lazy"
      />
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold sm:text-base">{title}</h2>
        <p className="truncate text-xs text-white/70 sm:text-sm">{artistNames}</p>
        <p className="text-xs text-white/45">
          {year || "Année inconnue"} · {item.user_name}
        </p>
      </div>
    </article>
  );
};

export default Item;
