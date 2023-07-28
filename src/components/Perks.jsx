/* eslint-disable react/prop-types */
import {
  ArrowLeftOnRectangleIcon,
  HandThumbUpIcon,
  RadioIcon,
  TruckIcon,
  TvIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

const Perks = ({ selected, onChange }) => {
  function handleCbClick(event) {
    const { checked, name } = event.target;
    if (checked) onChange([...selected, name]);
    else
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCbClick}
        />
        <WifiIcon className="h-6 w-6" />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCbClick}
        />
        <TruckIcon className="h-6 w-6" />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleCbClick}
        />
        <TvIcon className="h-6 w-6" />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("radio")}
          name="radio"
          onChange={handleCbClick}
        />
        <RadioIcon className="h-6 w-6" />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleCbClick}
        />
        <HandThumbUpIcon className="h-6 w-6" />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCbClick}
        />
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        <span>Private Entrance</span>
      </label>
    </>
  );
};

export default Perks;
