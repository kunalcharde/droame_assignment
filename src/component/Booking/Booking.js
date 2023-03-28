import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import BookingForm from './BookingForm'
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import NavBar from '../LandingPage/NavBar';
import BookingTable from './BookingTable';


// BOOKING MAIN COMPONENT
function Booking() {
  return (
    <div>
      <NavBar/>
      <Grid  container xs={12} sx={{marginTop:4}} >
          <Grid item xs={12} sm={8} sx={{display:'flex', align:'center',justifyContent: 'center'}}>
            <TextField/>
            <Button variant="contained" sx={{marginLeft:2}}><YoutubeSearchedForIcon/></Button>
          </Grid>
          <BookingForm/>
        
      </Grid>
      <div>
        <BookingTable/>
      </div>
    </div>
  )
}

export default Booking
