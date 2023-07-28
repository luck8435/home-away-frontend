import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import {
  CalendarDaysIcon,
  MoonIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

import PlaceImage from "../components/PlaceImage";
import AccountNav from "../components/AccountNav";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((resp) => {
      setBookings(resp.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={"/account/bookings/" + booking._id}
              key={booking._id}
              className="flex gap-4 items-center bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImage place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <div className="flex gap-1 mb-2 mt-4 text-gray-500 items-center">
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
                  <div className="flex gap-1 items-center">
                    <WalletIcon className="w-6 h-6" />
                    <span className="font-semibold">
                      Total price: ₹{booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
