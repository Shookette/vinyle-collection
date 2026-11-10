import type { FC } from "react";

type ChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

// Petit bouton arrondi sélectionnable (utilisé par le filtre par genre).
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

export default Chip;
