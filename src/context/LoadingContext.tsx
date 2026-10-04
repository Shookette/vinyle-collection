import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type LoadingContextType = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => null
});



export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const context = { loading, setLoading };

  return (
    <LoadingContext.Provider value={context} > {children}</LoadingContext.Provider >
  )
}


export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading doit être utilisé à l'intérieur du LoadingProvider")
  }

  return context;
}