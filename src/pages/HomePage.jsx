import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Image from "../components/Image";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((resp) => {
      setPlaces(resp.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.map((place) => (
        <Link to={`/places/${place._id}`} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image
                className="rounded-2xl aspect-square object-cover"
                src={place.photos[0]}
                alt=""
              />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h2 className="text-sm text-gray-500">{place.title}</h2>
          <div className="mt-1">
            <span className="font-bold">₹{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
