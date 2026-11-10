import { useLoading } from "../../context/LoadingContext";
import spinner from "../../assets/spinner.svg";

const Loader = () => {
  const { loading } = useLoading();

  if (!loading) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-strong">
      <img src={spinner} className="animate-spin aspect-square w-loader" alt="Chargement…" />
    </div>
  );
};

export default Loader;
