import React,{useState,useContext,useEffect} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {customerContext}  from '../../Context/customerContext'
import { db } from "../../FirbaseConfig";
import { v4 as uuidv4 } from 'uuid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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

export default function EditCustomer({id,data}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (event) => {
    event.stopPropagation()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, dispatch] = useContext(customerContext);
  const [customerDetails,setCustomerDetails] = useState({
      first_name : data.first_name,
      last_name: data.last_name,
      email : data.email,
      address : data.address,
      phone : data.phone,
  })


  async function handleSubmit(){
    handleClose()
    handleClose();
    const docRef = doc(db, "CustomerDetails", id);
    updateDoc(docRef, customerDetails)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });

      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: {...customerDetails}
      });
  }
    
  return (
    <div>
      <Button  onClick={(e)=>handleClickOpen(e)} sx={{marginRight:2}}>
        Edit
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Customer Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container xs={12} sm={12} spacing={2} component="form">
            <Grid item xs={6}>
                <TextField 
                required
                value={customerDetails.first_name}
                fullWidth
                placeholder='Enter Customer First Name'
                onChange={(e)=>{setCustomerDetails({...customerDetails,first_name: e.target.value})}}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                required
                fullWidth 
                value={customerDetails.last_name}
                placeholder='Enter Customer Last Name'
                onChange={(e)=>{setCustomerDetails({...customerDetails,last_name: e.target.value})}}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                required 
                fullWidth
                value={customerDetails.phone}
                placeholder='Enter Customer Phone No'
                onChange={(e)=>{setCustomerDetails({...customerDetails,phone: e.target.value})}}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                required 
                fullWidth
                value={customerDetails.email}
                placeholder='Enter Customer Email'
                onChange={(e)=>{setCustomerDetails({...customerDetails,email: e.target.value})}}
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                required
                fullWidth 
                value={customerDetails.address}
                placeholder='Enter Customer Address'
                onChange={(e)=>{setCustomerDetails({...customerDetails,address: e.target.value})}}
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
