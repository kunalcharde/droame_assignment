import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import { db } from "../../FirbaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { BookingContext } from "../../Context/bookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function EditBooking({ id, data }) {
  console.log(data);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, dispatch] = useContext(BookingContext);
  const [startDate, setStartDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    location: data.location,
    bookingTime: new Date(),
    bookingDate: new Date(),
    bookingType: data.bookingType,
  });
  useEffect(() => {
     console.log(bookingDetails)
    //  console.log(startDate,"date from india")
  }, [bookingDetails]);
  async function handleSubmit() {
    handleClose();
    const docRef = doc(db, "BookingDetails", id);
    updateDoc(docRef, bookingDetails)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });

      dispatch({
        type: "UPDATE_BOOKING",
        payload: {...bookingDetails}
      });
   }

  return (
    <div>
      <Button onClick={handleClickOpen}>Edit</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Booking Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container xs={12} sm={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.first_name}
                placeholder="Enter Customer First Name"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    first_name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.last_name}
                placeholder="Enter Customer last Name"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    last_name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.location}
                placeholder="Enter Location"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    location: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.bookingType}
                placeholder="Booking Type"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    bookingType: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={bookingDetails.phone}
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    phone: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              {/* <DatePicker selected={startDate} onChange={(date)=> {setBookingDetails({...bookingDetails,bookingDate: date})}} dateFormat="yyyy-mm-dd" placeholder="Select Data" /> */}
              <DatePicker
                showIcon
                selected={bookingDetails.bookingDate}
                onChange={(date) => setStartDate(date)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
