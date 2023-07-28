/* eslint-disable react/prop-types */
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "./Image";

const PlaceGallary = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-w-full min-h-full">
        <div className="bg-black p-8 grid gap-4">
          <div className="">
            <h2 className="text-2xl sm:text-3xl sm:mr-36">
              Photos of {place.title}
            </h2>
            <div className="flex justify-left mt-2">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="sm:fixed sm:right-12 sm:top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
              >
                <XMarkIcon className="h-6 w-6" />
                Close photos
              </button>
            </div>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo} className="w-full h-full mx-auto">
                <Image className="w-full h-full" src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div className="aspect-square">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="h-full w-full object-cover cursor-pointer"
                  src={place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={place.photos[1]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer relative top-2"
                  src={place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-2xl bg-white shadow shadow-gray-500"
        >
          <PhotoIcon className="w-6 h-6" />
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default PlaceGallary;
