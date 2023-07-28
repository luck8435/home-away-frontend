import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [isRedirected, setIsRedirected] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((resp) => {
      const { data } = resp;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setPerks(data.perks);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setMaxGuests(data.maxGuests);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(title, description) {
    return (
      <>
        {inputHeader(title)} {inputDescription(description)}
      </>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const placeData = {
      title,
      address,
      description,
      addedPhotos,
      extraInfo,
      perks,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places/" + id, placeData);
    } else {
      await axios.post("/places", placeData);
    }
    setIsRedirected(true);
  }

  if (isRedirected) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          `Title for your place, should be short and catchy as in
              advertisements`
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {preInput("Address", `Address to this place`)}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        {preInput("Photos", `more = better`)}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", `description of the place`)}
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {preInput("Perks", `select all the perks of your place`)}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 ">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", `house rules, etc.`)}
        <textarea
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
        />
        {preInput(
          "Check in&out times",
          `add check in and out times, remember to have some time window for
              cleaning the room between guests`
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div className="mt-2 -mb-1">
            <h3>Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(event) => setMaxGuests(event.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
