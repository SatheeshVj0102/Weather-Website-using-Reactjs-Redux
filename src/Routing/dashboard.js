import axios from "axios";
import React, { useState } from "react";
import Weather from "../Table/weather";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {  weatherCheck } from './redux/redux'

function Dashboard() {
  const [value, setValue] = useState({ location: "" });
  const [coord, setCoord] = useState({ longitude: null, latitude: null });
  const [err, setErr] = useState(null);
  const [flag, setFlag] = useState(false);
  const [weather, setWeather] = useState([]);
  const navigate = useNavigate();
  const location= useLocation();
  const getValue = location.state ||'';
  const dispatch = useDispatch();

  const getlatlog = async () => {
    let Api_key = "e337b08c76b96812554b812f1d1140c3";
    if (value.location) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value.location}&appid=${Api_key}`
        )
        .then((response) => {
          const newCorrd = {
            longitude: response.data.coord.lon,
            latitude: response.data.coord.lat,
          };
          setCoord(newCorrd);
          console.log("001", coord);
          if (newCorrd.latitude !== null && newCorrd.longitude !== null) {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${newCorrd.latitude}&lon=${newCorrd.longitude}&appid=${Api_key}`
              )
              .then((response) => {
                let weatherDetails = {};
                if (response) {
                  let kevinTemp = response.data.main.temp;
                  let KelvinToCelcius = kevinTemp - 273.15;
                  weatherDetails.locationName = response.data.name;
                  weatherDetails.temperature = Math.ceil(KelvinToCelcius);
                  weatherDetails.climate = response.data.weather[0].main;
                  setWeather((previous) => [...previous, weatherDetails]);
                  console.log("weatherDetails",weatherDetails);
                  dispatch(weatherCheck({weatherDetails}))
                
                  setFlag(true)
                }
              });
          }
          setErr(null);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setErr("Error fetching weather data");
        });
    }
  };

  const submit =async (e) => {
    e.preventDefault();
    getlatlog();
    // setFlag(true);
    console.log('wet',weather)
   
    
};

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {!flag ? (
        <div className="split">
          <button
            style={{ width: "100%", fontWeight: "bold", backgroundColor:'#0A75C4' }}
            className="btn btn-primary"
          >
            <h3
              style={{
                color: "white",
                fontFamily: "Times New Roman, Times, serif",
                
              }}
            >
              Wheather check<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtC3iNwaYvnNmF5iCFpPZVuojHWP3Sc2EJ2dAUpQ0HRMu9mOHxG3T7qV-14Iy0Pg2HcbA&usqp=CAU" width='6%' height='90px'/>
            </h3>
          </button>

          <div className="img"  style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
            <form onSubmit={submit}>
              <div className="center-content">
                <div style={{ textAlign: "center", padding: "10px" }}>
                  <h3
                    className="head1"
                  >
                    Enter your location :
                  </h3>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    className="form-control1"
                    onChange={handleChange}
                  />
                  <br></br> <br></br>
                  <button className="btn btn-primary" >check Whether</button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ display:"flex" ,justifyContent:'space-evenly',marginTop:'2%'}}>
                <div className="staticImage1"> &nbsp;<h3 className="head">Cloudly</h3></div>
                <div className="staticImage2">&nbsp;<h3 className="head">Rain</h3></div>
                <div className="staticImage3">&nbsp;<h3 className="head">Mist</h3></div>
          </div>
        </div>
      ) : (
        <div className="split">
          <Weather weatherData={weather}  flag={flag} setFlag={flag} />
        </div>
      )}
    </div>
  );
}
export default Dashboard;
