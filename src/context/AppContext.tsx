import React, { useState } from "react";
import { type Models } from "appwrite";
import { useContext, createContext } from "react";
import { Toaster } from "react-hot-toast";
interface IAppContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  loggedInUser: ILoggedInUser | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<ILoggedInUser | null>>;
  updateLoggedInUser: (updates: Partial<ILoggedInUser>) => void;
}

const appContext = createContext<IAppContext | null>(null);

interface ILoggedInUser extends Models.User<Models.Preferences> {
  isActive: boolean;
  acct: object | null;
  data: object | null;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  password: string | undefined;
  hash: string | undefined;
  hashOptions: object | undefined;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Models.Preferences;
  targets: Models.Target[];
  accessedAt: string;
}

interface LayoutProps {
  children: React.ReactNode;
}
// Create a Provider component
const AppProvider = ({ children }: LayoutProps) => {
  const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser | null>({
    isActive: false,
    acct: null,
    data: null,
    $id: "", // Provide default value (empty string or actual ID)
    $createdAt: "",
    $updatedAt: "",
    name: "", // Default name (can be empty string or placeholder)
    email: "", // Default email (can be empty string or placeholder)
    password: "", // Default password or leave empty
    hash: "", // Default hash or leave empty
    hashOptions: {}, // Default hashOptions or empty object
    registration: "",
    status: false,
    labels: [],
    passwordUpdate: "",
    phone: "",
    emailVerification: false,
    phoneVerification: false,
    mfa: false,
    prefs: {}, // Default prefs as empty object
    targets: [],
    accessedAt: "",
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const updateLoggedInUser = (updates: Partial<ILoggedInUser>) => {
    setLoggedInUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, ...updates }; // Merge the updates with the previous state
      }
      return prevUser; // If no user is logged in, don't update
    });
  };

  return (
    <appContext.Provider
      value={{
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        loggedInUser,
        setLoggedInUser,
        updateLoggedInUser,
      }}
    >
      <Toaster />
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext)!;

if (!useAppContext) {
  throw new Error("appContext must be used within its Provider");
}

export { AppProvider, useAppContext };
