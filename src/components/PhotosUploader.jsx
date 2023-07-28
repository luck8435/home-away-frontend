/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  CloudArrowUpIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "./Image";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(event) {
    event.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
  }

  async function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("my_files", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        {
          const { data: filenames } = resp;
          onChange((prev) => {
            return [...prev, ...filenames];
          });
        }
      });
  }

  function removePhoto(event, filename) {
    event.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectAsMainPhoto(event, filename) {
    event.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link ...jpg"
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-32 flex relative">
              <Image
                className="rounded-2xl w-full object-cover position-center"
                src={link}
              />
              <button
                onClick={(event) => removePhoto(event, link)}
                className="absolute bottom-1 right-1 bg-black bg-opacity-50 rounded-2xl py-2 px-3 cursor-pointer text-white"
              >
                <TrashIcon className="h-5 w-6" />
              </button>
              <button
                onClick={(event) => selectAsMainPhoto(event, link)}
                className="absolute bottom-1 left-1 bg-black bg-opacity-50 rounded-2xl py-2 px-3 cursor-pointer text-white"
              >
                {link === addedPhotos[0] ? (
                  <SolidStarIcon className="h-5 w-6" />
                ) : (
                  <StarIcon className="h-5 w-6" />
                )}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer border flex items-center justify-center gap-1 bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <CloudArrowUpIcon className="w-8 h-8" />
          Uplaod
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
