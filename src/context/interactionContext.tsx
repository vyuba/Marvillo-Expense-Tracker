import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAppContext } from "./AppContext";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";

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
  // const { loggedInUser } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const handleFormActive = () => {
    setActive(!active);
    return active;
  };

  const { updateLoggedInUser } = useAppContext();

  const checkUser = useCallback(async () => {
    setLoading(true);
    try {
      const user = await account.get();
      // if (account.getSession("current") === null) {
      //   alert("You must be logged in to access this page!");
      //   window.location.href = "/";
      // }
      const loggedIn = await account.getSession("current");
      console.log(loggedIn);
      updateLoggedInUser({
        acct: loggedIn,
        isActive: true,
        $id: user.$id,
        $createdAt: user.$createdAt,
        $updatedAt: user.$updatedAt,
        name: user.name,
        email: user.email,
        password: user.password,
        hash: user.hash,
        hashOptions: user.hashOptions,
        registration: user.registration,
        status: user.status,
        labels: user.labels,
        passwordUpdate: user.passwordUpdate,
        phone: user.phone,
        emailVerification: user.emailVerification,
        phoneVerification: user.phoneVerification,
        mfa: user.mfa,
        prefs: user.prefs,
        targets: user.targets,
        accessedAt: user.accessedAt,
      });

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      toast.error(`${error}`);
      console.log(error);
      // if (!loggedInUser && !loggedInUser?.acct?.current) {
      //   alert("You must be logged in to access this page!");
      //   window.location.href = "/";
      // }
      if (error === 401) {
        alert("You must be logged in to access this page!");
        window.location.href = "/";
      }
    }
  }, [updateLoggedInUser]);

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full z-[100000000] fixed inset-0 h-screen flex items-center justify-center font-medium text-xl flex-col bg-background text-white capitalize">
        <div className="w-32 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stopColor="#9E56FF"></stop>
              <stop offset=".3" stopColor="#9E56FF" stopOpacity=".9"></stop>
              <stop offset=".6" stopColor="#9E56FF" stopOpacity=".6"></stop>
              <stop offset=".8" stopColor="#9E56FF" stopOpacity=".3"></stop>
              <stop offset="1" stopColor="#9E56FF" stopOpacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#9E56FF"
              strokeWidth="15"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </div>
        <span>loading..</span>
        <span className="flex absolute bottom-4 items-center gap-2 text-base">
          <img className="w-7 " src="/marvilo.svg" alt="" />
          <span>marvillo</span>
        </span>
      </div>
    );
  }

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
