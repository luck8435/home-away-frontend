import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallary from "../components/PlaceGallary";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((resp) => {
      setPlace(resp.data);
    });
  }, []);

  if (!id) {
    return "";
  }
  if (!place) {
    return "Loading...";
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-4">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink address={place.address} />
      <PlaceGallary place={place} />
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{place.description}</p>
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      {place?.extraInfo && (
        <div className="bg-white border-t mt-4 -mx-8 px-8 pt-8">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacePage;
