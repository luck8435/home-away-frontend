import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  //   const [redirect, setRedirect] = useState(null);
  const { user, ready } = useContext(UserContext);

  let { subpage } = useParams();

  async function handleLogout() {
    await axios.post("/logout");
    // setRedirect("/");
    window.location.replace("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  //   if (redirect) {
  //     window.location.replace("/");
  //   }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
