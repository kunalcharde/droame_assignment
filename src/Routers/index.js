import React from "react";
import CustomerDetailsForm from "../component/Customer/Customer";
import LandingPage from "../component/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingForm from "../component/Booking/Booking";
const NavRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/customer" element={<CustomerDetailsForm />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/anylisis" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NavRoutes;
