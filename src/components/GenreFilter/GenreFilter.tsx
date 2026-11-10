import type { FC } from "react";
import Chip from "../Chip/Chip";

type GenreFilterProps = {
  genres: string[];
  // undefined = "Tous"
  selected: string | undefined;
  onSelect: (genre: string | undefined) => void;
};

// Filtre par genre : une rangée de "chips" qui défile horizontalement sur mobile
// et passe à la ligne sur écran plus large.
const GenreFilter: FC<GenreFilterProps> = ({ genres, selected, onSelect }) => (
  <nav
    aria-label="Filtrer par genre"
    className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:none] sm:mx-0 sm:px-0"
  >
    <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
      <Chip label="Tous" active={selected === undefined} onClick={() => onSelect(undefined)} />
      {genres.map((genre) => (
        <Chip key={genre} label={genre} active={genre === selected} onClick={() => onSelect(genre)} />
      ))}
    </div>
  </nav>
);

export default GenreFilter;
