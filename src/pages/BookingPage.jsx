import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallary from "../components/PlaceGallary";
import { CalendarDaysIcon, MoonIcon } from "@heroicons/react/24/outline";
import { differenceInCalendarDays, format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((resp) => {
        const foundBooking = resp.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block" address={booking.place.address} />
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between">
        <div className="">
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <div className="flex gap-1">
            <MoonIcon className="h-6 w-6" />
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{" "}
            nights
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="w-6 h-6" />
              {format(new Date(booking.checkIn), "yyyy-mm-dd")}
            </div>
            &rarr;
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="w-6 h-6" />
              {format(new Date(booking.checkOut), "yyyy-mm-dd")}
            </div>
          </div>
        </div>
        <div className="bg-primary px-6 py-4 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-2xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallary place={booking.place} />
    </div>
  );
};

export default BookingPage;
