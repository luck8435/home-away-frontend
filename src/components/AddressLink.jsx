/* eslint-disable react/prop-types */
import { MapPinIcon } from "@heroicons/react/24/outline";

const AddressLink = ({ address, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += ` flex gap-1 items-center font-semibold underline`;
  return (
    <a
      className={className}
      target="_blank"
      rel="noreferrer"
      href={"https://maps.google.com/?q=" + address}
    >
      <MapPinIcon className="w-5 h-5" />
      {address}
    </a>
  );
};

export default AddressLink;
