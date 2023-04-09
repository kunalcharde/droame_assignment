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
import { customerContext } from "../../Context/customerContext";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs,doc, deleteDoc,onSnapshot  } from "firebase/firestore";
import { db } from "../../FirbaseConfig";
import EditCustomer from "./EditCustomerDetails";


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

export default function DataTable() {
  const [state, dispatch] = useContext(customerContext);
  const [data, setData] = useState([]);

 async function handleDeleteCustomer(id) {
    dispatch({
      type: "DELETE_CUSTOMER",
      payload: id,
    });
    await deleteDoc(doc(db, "CustomerDetails", id));
  }

  const fetchAllApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "CustomerDetails"));
    let a = [];
    querySnapshot.forEach((doc) => {
      a.push(doc.data());
    });
    setData(a);
  };

  useEffect(() => {
    fetchAllApplications();
    console.log("fetch", data);
  }, [state]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sr no.</StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer Phone</StyledTableCell>
            <StyledTableCell align="center">Customer Email</StyledTableCell>
            <StyledTableCell align="center">Customer Address</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((customer, i) => (
              <StyledTableRow key={uuidv4()}>
                <StyledTableCell align="center">
                  {i+1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.first_name} {customer.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.address}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button sx={{ marginRight: 2 }}><EditCustomer id={customer.customer_id} data={customer}/></Button>
                  <Button
                    onClick={() => {
                      handleDeleteCustomer(customer.customer_id);
                    }}
                  >
                    Delete
                  </Button>
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
