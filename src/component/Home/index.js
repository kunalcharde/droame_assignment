import { Grid } from "@mui/material";
import { textAlign } from "@mui/system";
import React from "react";
import drone from "../../assets/drone.gif";
import "./style.css"
function Home() {
  return (
    <div>
    <Grid container xs={12} sm={12} >
      <Grid item xs={12} sm={12} sx={{display:'grid',placeContent:'center',textAlign:'center',marginTop:5}}>
        <h1 className="heading">Take your Memories to the sky!</h1>
        <h3>Droame brings to you, your personal, automated-cinematographer.</h3>
      </Grid>
      <Grid item xs={12} sm={12} sx={{display:'grid',placeContent:'center'}}>
        <img src={drone} alt="logo" />
      </Grid>
    </Grid>
    </div>
  );
}

export default Home;
