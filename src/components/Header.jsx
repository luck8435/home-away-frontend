import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";

import Logo from "./Logo";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between">
      <Logo />
      <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div className="text-sm font-semibold text-gray-700">Anywhere</div>
        <div className="border-l border-gray-300">&nbsp;</div>
        <div className="text-sm font-semibold text-gray-700">Any week</div>
        <div className="border-l border-gray-300">&nbsp;</div>
        <div className="text-sm font-semibold text-gray-400">Add guests</div>

        <button className="bg-primary text-white p-2 rounded-full">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
      </div>
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"
      >
        <Bars3Icon className="h-5 w-5" />
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <UserIcon className="h-6 w-6 relative top-1" />
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
};

export default Header;
