import Image from "./Image";

/* eslint-disable react/prop-types */
const PlaceImage = ({ place, index = 0, className }) => {
  if (!place.photos.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={place.photos[index]} alt="" />;
};

export default PlaceImage;
