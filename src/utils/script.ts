import { useAppContext } from "../context/AppContext";

const { LoggedInUser, setLoggedInUser } = useAppContext();
export const updateLoggedInUser = (updates) => {
  setLoggedInUser((prevState) => ({
    ...prevState,
    ...updates,
  }));
};
