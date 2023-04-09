import * as React from "react";
import { useState, useEffect, useSelector, useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import { BookingContext } from "../../Context/bookingContext";
import { v4 as uuidv4 } from "uuid";
import EditBooking from "./EditBooking";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../FirbaseConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingTable() {
  const [state, dispatch] = useContext(BookingContext);
  const [data, setData] = useState([]);

  async function handleDeleteBooking(id) {
    dispatch({
      type: "DELETE_BOOKING",
      payload: id,
    });
    await deleteDoc(doc(db, "BookingDetails", id));
  }

  const fetchAllApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "BookingDetails"));
    let a = [];
    querySnapshot.forEach((doc) => {
      a.push(doc.data());
    });
    setData(a);
  };

  useEffect(() => {
    fetchAllApplications();
     console.log(state,"Booking State")
    console.log("fetch", data);
  }, [state]);

  function dateandTime(timestamp){
    console.log(timestamp,"Date and Time")
    const seconds = timestamp.seconds
    const nanoseconds = timestamp.nanoseconds
    const milliseconds = seconds * 1000 + Math.round(nanoseconds / 1e6);
    console.log("Seconds :", seconds)
    console.log("Nano :", nanoseconds)
    const fullDate = new Date(milliseconds)
    const Month = fullDate.getMonth()+1;
    const Day = fullDate.getDate()
    const Year = fullDate.getFullYear()
    console.log(Year,"year")
    return `${Day}-${Month}-${Year}`
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sr.No</StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer Email</StyledTableCell>
            <StyledTableCell align="center">Customer Phone</StyledTableCell>
            <StyledTableCell align="center">Booking Location</StyledTableCell>
            <StyledTableCell align="center">Booking Type</StyledTableCell>
            <StyledTableCell align="center">Booking Date</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((booking, i) => (
              <StyledTableRow key={uuidv4()}>
                <StyledTableCell align="center">{i+1}</StyledTableCell>
                <StyledTableCell align="center">
                  {booking.first_name} {booking.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                {booking.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.location}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {booking.bookingType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {booking.bookingDate.toDate().toLocaleString()} */}
                 {dateandTime(booking.bookingDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button sx={{ marginRight: 2 }}><EditBooking id={booking.booking_id} data={booking}/></Button>
                  <Button onClick={() => {handleDeleteBooking(booking.booking_id);}}>Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <h2>No Data Found</h2>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
