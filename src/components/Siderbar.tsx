import {
  CommandIcon,
  CreditCard,
  LucideHome,
  LucideTicketMinus,
  PiggyBankIcon,
  UserSquareIcon,
} from "lucide-react";
import Tooltip from "./Tooltip";
import { account } from "../lib/appwrite";
import { useAppContext } from "../context/AppContext";
import { useNavigate, NavLink } from "react-router";

interface SideBarProps {
  activeNavbar: boolean;
  setActiveNavbar: (value: boolean) => void;
}

function SideBar({ activeNavbar, setActiveNavbar }: SideBarProps) {
  const { loggedInUser, setLoggedInUser } = useAppContext();
  const navigate = useNavigate();
  const Navlinks = [
    { name: "home", link: "/dashboard/home", icon: <LucideHome /> },
    { name: "bank", link: "/dashboard/bank", icon: <PiggyBankIcon /> },
    { name: "income", link: "/dashboard/income", icon: <CreditCard /> },
    {
      name: "expence",
      link: "/dashboard/expense",
      icon: <LucideTicketMinus />,
    },
    // { name: "Taxes", link: "/profile", icon: <HistoryIcon /> },
  ];

  // const [sidebar, setSidebar] = useState(true);
  // const handleSidebarShrink = () => {
  //   setSidebar(!sidebar);
  // };

  console.log(loggedInUser);
  return (
    <nav
      className={`bg-[#0d0d0d] md:w-[270px] fixed md:static inset-0 flex  p-4 z-50 transition-all flex-col justify-between md:translate-x-0 ${
        activeNavbar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="w-full flex flex-col gap-3 md:mt-0">
        <div className="flex flex-row pt-4 items-center gap-2">
          <img className="w-8" src="/marvilo.svg" alt="" />
          <span className="text-lg font-medium">Marvilo</span>
        </div>
        <div className="border border-[#121212] rounded-md py-2 px-2 flex flex-row my-2">
          <input
            className="bg-transparent outline-none placeholder:capitalize w-full appearance-none "
            placeholder="search.."
            type="search"
            name=""
            id=""
          />
          <span className="flex flex-row text-base items-center justify-center">
            <CommandIcon size={18} strokeWidth={1.5} />
            <span>s</span>
          </span>
        </div>
        {Navlinks.map((nav, index) => (
          <Tooltip text={nav.name} key={index}>
            <NavLink
              onClick={() => setActiveNavbar(!activeNavbar)}
              to={nav.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#121212] w-full text-accent"
                  : "bg-transparent text-[#4f4e4e]"
              }
            >
              <li
                className={`p-3 capitalize font-semibold flex flex-row items-center  rounded-md bg-inherit 
                  w-fullgap-1`}
              >
                <span className="h-4 flex items-center justify-center">
                  {nav.icon}
                </span>
                <span className={` pl-2 whitespace-nowrap overflow-hidden `}>
                  {nav.name}
                </span>
              </li>
            </NavLink>
          </Tooltip>
        ))}
      </ul>
      <ul className="w-full border-t border-[#121212] py-4">
        <NavLink
          onClick={() => setActiveNavbar(!activeNavbar)}
          className={({ isActive }) =>
            isActive
              ? "bg-[#121212] w-full text-accent"
              : "bg-transparent text-[#4f4e4e]"
          }
          to={"/dashboard/profile"}
          //
        >
          <li className=" mb-4 w-full py-4 px-3 rounded-lg items-center gap-2 flex flex-row capitalize font-bold">
            <UserSquareIcon />
            <span>profile</span>
          </li>
        </NavLink>
        <li className="bg-[#121212] w-full py-4 px-3 rounded-lg items-center gap-2 flex flex-row">
          <div className="rounded-full w-8 h-8 bg-black "></div>
          <div className="flex flex-col capitalize">
            {loggedInUser ? (
              <div className="w-full">
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-white font-semibold text-sm">
                    {loggedInUser?.name}
                    New User
                  </span>
                  <button
                    type="button"
                    className="text-accent font-medium"
                    onClick={async () => {
                      await account.deleteSession("current");
                      setLoggedInUser(null);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
                <span className="text-xs text-white font-light">
                  {loggedInUser?.email}
                </span>
              </div>
            ) : (
              <a className="text-accent font-semibold" href="/login">
                Login
              </a>
            )}
          </div>
          {/* {loggedInUser ? (
            <>
              <span>{loggedInUser?.email}</span>
              <button type="button" onClick={() => loggedInUser?.logout()}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
          <button
            type="button"
            onClick={async () => {
              await account.deleteSession("current");
              setLoggedInUser(null);
              navigate("/");
            }}
          >
            Logout
          </button> */}
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
