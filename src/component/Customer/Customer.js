import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import CustomerDetailsForm from './CustomerDetailsForm'
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import NavBar from '../LandingPage/NavBar';
import DataTable from './DataTable';
const Customer = () => {
  return (
    <div>
      <NavBar/>
      <Grid  container xs={12} sx={{marginTop:4}} >
          <Grid item xs={12} sm={8} sx={{display:'flex', align:'center',justifyContent: 'center'}}>
            <TextField/>
            <Button variant="contained" sx={{marginLeft:2}}><YoutubeSearchedForIcon/></Button>
          </Grid>
          <CustomerDetailsForm/>
        
      </Grid>
      <div>
        <DataTable/>
      </div>
    </div>
  )
}

export default Customer
