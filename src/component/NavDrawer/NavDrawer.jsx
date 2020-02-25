import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import request from "request-promise-native";
import axios from 'axios';
import { SimpleModal } from "../Modal/Modal.jsx";
import { Container } from "@material-ui/core";


const drawerWidth = 300;
var latitude = 0;
var longitude = 0;
var time = 0;



const cityData = {
     
    "Shingletown" : {
      "latitude" : 34.0736,
      "longitude" : 118.4004,
      "population" : 34484
    },
    "Beverly Hills" : {
      "latitude" : 34.0736,
      "longitude" : 118.4004,
      "population" : 34484
    },
    "Carson City" : {
      "latitude" : 39.1638,
      "longitude" : 119.7674,
      "population" : 55439
    },
    "Oakland" : {
      "latitude" : 37.8044,
      "longitude" : 122.2712,
      "population" : 425195
    },
    "San Francisco" : {
      "latitude" : 37.773972,
      "longitude" : 122.4194,
      "population" : 805235
    },
    "San Jose" : {
      "latitude" : 37.3382,
      "longitude" : 121.8863,
      "population" : 55439
    },
    "Nevada City" : {
      "latitude" : 37.3382,
      "longitude" : 121.8863,
      "population" : 55439
    }
}


const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    textAlign: "center"
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    background: props =>
      props.color === "High"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === "High"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8
  },

  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));



export const NavDrawer = () => {
  var size = 0;
  var duration = 0; 
/*
  this.handleChange = this.handleChange.bind(this)
  const {lat, long, time} = this.state; 
  */
  const classes = useStyles();
  const [newsData, setNewsData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [lat,setLat] = useState('');
  const [long,setLong] = useState('');
  const [time,setTime] = useState('');
  var [coord,setCoord] = useState([]);

  function handleSubmit(){
      const x = {
        "latitude": lat,
        "longitude": long,
        "duration": time
      }
      axios.post(`http://54.90.166.180:80/output`, x)
      .then(res => {
        //console.log(res);
        console.log(JSON.stringify(res.data));
        size = parseFloat(res.data["Size"]);
        duration = parseFloat(res.data["Duration"]);
        document.getElementById("displaySize").innerHTML = size;
        document.getElementById("displayDuration").innerHTML = duration;
      })        
  }


  useEffect(() => {
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country/Messages.json"
    }).then(data => {
      const parsedData = JSON.parse(data);
      setNewsData(parsedData);
    }, console.log);

    request({
      method: "GET",
      uri: "https://wildfire-8cb6a.firebaseio.com/cities.json"
    }).then(data => {
      const parsedData = JSON.parse(data);
      const items = Object.keys(parsedData).map(key => {
        return [parsedData[key]["population"], key, parsedData[key]];
      });
      setDistrictData(items.sort((a, b) => b[0] - a[0]));
    });


    

    // onChange = (e) => {
    //   /*
    //     Because we named the inputs to match their
    //     corresponding values in state, it's
    //     super easy to update the state
    //   */
    //   this.setState({ [e.target.name]: e.target.value });
    // }

    
    // onSubmit = (e) => {
    //   e.preventDefault();
    //   // get our form data out of state
    //   const { fname, lname, email } = this.state;
    //   axios.post('/', { fname, lname, email })
    //     .then((result) => {
    //       //access the results here....
    //     });
    // }


    return () => {};
  }, []);

  return (

    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <List>
        <Container>
          <h1>FOREWARN</h1>
          <h2>Estimated Fire Size:</h2>
          <div id="displaySize"></div>
          <h2>Estimated Fire duration:</h2>
          <div id="displayDuration"></div>
        </Container>
        <Divider />
        <h3><form >
          <label>
    latitude:
    <input  onChange = {event=> setLat(event.target.value)}/>
  </label><br/>
  <label>
    longitude:
    <input onChange = {event=> setLong(event.target.value)}/>
  </label><br/>
  <label>
    time:
    <input onChange = {event=> setTime(event.target.value)} />
  </label>
  </form> </h3>
  <button type="submit" onClick={handleSubmit}> Submit!</button>
        <Divider />
        {districtData.map(item => {
          console.log(item);
          /*var name = cityData.cities[item[1]]; */
          console.log(item[1]);
          console.log(cityData[item[1]]);
          return (
            <div>
              <ListItem>
                <ListItemText
                    primary = {item[1]}
                    secondary = {`Population is : ${item[0]}`}
                />
  
              </ListItem>
                         
              <Divider />
            </div>
          );
        })}

        <h3>Updates</h3>
        <Divider />
        {newsData.map(item => {
          return (
            <div>
              <ListItem button>
                <SimpleModal
                  type={item.Type}
                  priority={item.Priority}
                  location={item.Location}
                  description={item.Description}
                  latitude={item.Latitude}
                  longitude={item.Longitude}
                />
                &nbsp;
                <ListItemText
                  primary={item.Priority}
                  secondary={item.Location}
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};
