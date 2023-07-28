import {
  HomeModernIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = `py-2 px-6 inline-flex gap-1 rounded-full`;
    if (type === subpage) {
      classes += ` bg-primary text-white`;
    } else {
      classes += ` bg-gray-200`;
    }
    return classes;
  }

  return (
    <nav className="w-full flex mt-8 gap-4 justify-center mb-8">
      <Link className={linkClasses("profile")} to={`/account`}>
        <UserIcon className="h-6 w-6" />
        My profile
      </Link>
      <Link className={linkClasses("bookings")} to={`/account/bookings`}>
        <ListBulletIcon className="h-6 w-6" />
        My bookings
      </Link>
      <Link className={linkClasses("places")} to={`/account/places`}>
        <HomeModernIcon className="h-6 w-6" />
        My accomodations
      </Link>
    </nav>
  );
};

export default AccountNav;
