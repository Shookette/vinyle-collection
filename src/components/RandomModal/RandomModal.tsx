import { useEffect, type FC } from "react";
import type { ItemType } from "../../types/collection";

type RandomModalProps = {
  item: ItemType;
  onClose: () => void;
  onReroll: () => void;
};

// Modale "Now Playing" : la pochette floutée sert de fond, avec un panneau en verre par-dessus.
const RandomModal: FC<RandomModalProps> = ({ item, onClose, onReroll }) => {
  const { title, artists, year, genres, styles, cover_image } = item.basic_information;

  // Fermer avec la touche Échap, et bloquer le défilement de la page tant que la modale est ouverte.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Album au hasard : ${title}`}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden p-4"
      onClick={onClose}
    >
      {/* Fond : la pochette agrandie et très floutée, puis un voile sombre pour garder le texte lisible. */}
      <img
        src={cover_image}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full scale-125 object-cover blur-3xl"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* stopPropagation : un clic dans le panneau ne doit pas fermer la modale. */}
      <div
        className="relative flex max-h-full w-full max-w-sm flex-col overflow-y-auto gap-5 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:max-w-3xl sm:flex-row sm:items-center sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={cover_image}
          alt={`Pochette de ${title}`}
          className="aspect-square w-full rounded-2xl object-cover shadow-2xl shadow-black/50 sm:w-72"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Ce soir on écoute</p>
            <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
            <p className="mt-1 text-lg text-white/80">{artists.map((artist) => artist.name).join(", ")}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {year > 0 && <span className="rounded-full bg-white/15 px-3 py-1">{year}</span>}
            {[...new Set([...genres, ...(styles ?? [])])].map((tag) => (
              <span key={tag} className="rounded-full bg-white/15 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-white/60">Collection de {item.user_name}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onReroll}
              className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95"
            >
              🎲 Un autre
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-white/30 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 active:scale-95"
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
