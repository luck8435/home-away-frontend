import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex gap-1 text-primary items-center  ">
      <PaperAirplaneIcon className="h-8 w-8 -rotate-90" />
      <span className="hidden md:block font-bold text-lg">HomeAway</span>
    </Link>
  );
};

export default Logo;
