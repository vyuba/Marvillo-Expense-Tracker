import { Menu, X } from "lucide-react";
interface NavbarProps {
  activeNavbar: boolean;
  setActiveNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}
function Navbar({ activeNavbar, setActiveNavbar }: NavbarProps) {
  return (
    <div className="w-full z-[100] bg-[#0D0D0D] border-b-2 border-secondary  fixed top-0 left-0 md:hidden">
      <nav className="w-full flex items-center py-5 px-5 gap-3 justify-between">
        <div className="flex flex-row items-center gap-2">
          <img className="w-8" src="/marvilo.svg" alt="" />
          <span className="text-lg font-medium">Marvilo</span>
        </div>
        <button
          onClick={() => setActiveNavbar(!activeNavbar)}
          className="bg-[#121212] p-2 rounded-md z-[10000] relative"
        >
          {activeNavbar ? <X /> : <Menu />}
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
