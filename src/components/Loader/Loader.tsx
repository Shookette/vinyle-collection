import { useLoading } from '../../context/LoadingContext'
import spinner from "../../assets/spinner.svg"

const Loader = () => {
  const { loading } = useLoading();

  if (!loading) {
    return <></>;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'>
      <img
        src={spinner}
        className='animate-spin aspect-square w-[clamp(6rem,30vmin,16rem)]'
        alt="Chargement…"
      />
    </div>
  );
}

export default Loader;
