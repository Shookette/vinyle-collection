import type { FC } from "react";

type GenreFilterProps = {
  genres: string[];
  // undefined = "Tous"
  selected: string | undefined;
  onSelect: (genre: string | undefined) => void;
};

type ChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const Chip: FC<ChipProps> = ({ label, active, onClick }) => {
  const colors = active
    ? "border-primary bg-primary text-primary-fg"
    : "border-surface-border bg-surface text-fg-muted hover:bg-surface-hover";

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${colors}`}
    >
      {label}
    </button>
  );
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
