import type { FC, KeyboardEvent } from "react";
import { useRandom } from "../../context/RandomContext";

// Modale "Now Playing" : la pochette floutée sert de fond, avec un panneau en verre par-dessus.
// Elle est affichée à la racine de l'app (main.tsx) et s'ouvre dès qu'un album est tiré au hasard.
const RandomModal: FC = () => {
  const { randomItem, reroll, closeRandom } = useRandom();

  if (!randomItem) {
    return null;
  }

  const { title, artists, year, genres, styles, cover_image } = randomItem.basic_information;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeRandom();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Album au hasard : ${title}`}
      // tabIndex + autoFocus : la modale prend le focus à l'ouverture, pour recevoir la touche Échap.
      tabIndex={-1}
      autoFocus
      onKeyDown={onKeyDown}
      onClick={closeRandom}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden p-4 outline-none"
    >
      {/* Fond : la pochette agrandie et très floutée, puis un voile sombre pour garder le texte lisible. */}
      <img src={cover_image} alt="" aria-hidden className="absolute inset-0 size-full scale-125 object-cover blur-bg" />
      <div className="absolute inset-0 bg-overlay" />

      {/* stopPropagation : un clic dans le panneau ne doit pas fermer la modale. */}
      <div
        className="relative flex max-h-full w-full max-w-sm flex-col overflow-y-auto gap-5 rounded-panel border border-glass-border bg-glass-panel p-5 shadow-2xl shadow-shadow backdrop-blur-glass sm:max-w-3xl sm:flex-row sm:items-center sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={cover_image}
          alt={`Pochette de ${title}`}
          className="aspect-square w-full rounded-cover object-cover shadow-2xl shadow-shadow sm:w-72"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">Ce soir on écoute</p>
            <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
            <p className="mt-1 text-lg text-fg-muted">{artists.map((artist) => artist.name).join(", ")}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {year > 0 && <span className="rounded-full bg-surface-hover px-3 py-1">{year}</span>}
            {[...new Set([...genres, ...(styles ?? [])])].map((tag) => (
              <span key={tag} className="rounded-full bg-surface-hover px-3 py-1">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-fg-subtle">Collection de {randomItem.user_name}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={reroll}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover active:scale-95"
            >
              🎲 Un autre
            </button>
            <button
              type="button"
              onClick={closeRandom}
              className="flex-1 rounded-full border border-surface-border px-4 py-2.5 text-sm font-semibold transition hover:bg-surface active:scale-95"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomModal;
