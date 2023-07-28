import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

import AccountNav from "../components/AccountNav";
import PlaceImage from "../components/PlaceImage";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 bg-primary rounded-full text-white px-6 py-2"
        >
          <PlusIcon className="h-6 w-6" />
          Add new place
        </Link>
      </div>
      <div className="mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                <PlaceImage place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
