import { useLoading } from '../../context/LoadingContext'
import spinner from "../../assets/spinner.svg"

const Loader = () => {
  const { loading } = useLoading();

  if (!loading) {
    return <></>;
  }

  return (<>
    <div className='bg-black opacity-90 w-full h-full absolute'></div>
    <img src={spinner} className='absolute top-[35%] left-[35%] animate-spin w-sm h-sm' alt="loader" />
  </>);
}

export default Loader;