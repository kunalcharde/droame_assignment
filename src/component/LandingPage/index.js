import React from "react";
import NavBar from "./NavBar";
// import CustomerDetailsForm from "../Customer/CustomerDetailsForm";
// import { Button, Grid, TextField } from "@mui/material";
// import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
// import CustomizeTables from "./Table";
// import AddCustomer from "../Customer/CustomeDetailsForm";
// import AddBooking from "../Booking";
import Home from "../Home";
import "./style.css";
const LandingPage = () => {
  return (
    <div className="backGround">
      <div>
        <NavBar />
        <Home />
        {/* <CustomizeTables/> */}
      </div>
    </div>
  );
};

export default LandingPage;
