import { createContext, useContext, useState } from "react";

interface IInteractContext {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormActive: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
}

const interactContext = createContext<IInteractContext | null>(null);

function InteractionProvider({ children }: LayoutProps) {
  const [active, setActive] = useState(false);
  const handleFormActive = () => {
    setActive(!active);
    return active;
  };

  console.log(active);

  return (
    <interactContext.Provider
      value={{
        active,
        setActive,
        handleFormActive,
      }}
    >
      {children}
    </interactContext.Provider>
  );
}

const useInteract = () => useContext(interactContext)!;

export { useInteract, InteractionProvider };
