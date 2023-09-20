import React, { useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { useSelector } from 'react-redux'

const Weather = (props) => {
  const user = useSelector(state=>state.weatherDet.value);
  const loginCreditenials = useSelector(state=>state.loginCredentials.value);
  console.log("user",user,loginCreditenials)
  
  const navigate = useNavigate();
const weatherData = props.weatherData;

  
  
  

  return (
      <div>
      <div>
        <h3>Weather Deatils :</h3>
      </div>
       <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <td>Serial no</td>
              <td> Location name </td>
              <td> temperature</td>
              <td> climate </td>
            </tr>
          </thead>
          <tbody>
            {/* {weatherData.weatherData.map((data, index) => ( */}
                {props.weatherData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.locationName}</td>
                <td>{data.temperature}%</td>
                <td>{data.climate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {weatherData?.[0]?.climate === "Rain" ||
        weatherData?.[0]?.climate === "undefined" ? (
          <div>
            <img
              src="https://www.thestatesman.com/wp-content/uploads/2020/08/Rain.jpg"
              width="700px"
              height="400px"
              id="rain"
            />
            <h3 style={{ fontFamily: "monospace" }}>It's Raining</h3>
          </div>
        ) : weatherData?.[0]?.climate === "Mist" ||
          weatherData?.[0]?.climate === "Drizzle" ? (
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKsoxJgpzEJCbfIAQAu6My6A9uwt97SnO-ww&usqp=CAU"
              width="700px"
              height="400px"
              id="cloud"
            />
            <h3 style={{ fontFamily: "monospace" }}>It's Mist</h3>
          </div>
        ) : (
          <div>
            <img
              src="https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=612x612&w=0&k=20&c=3JGI13B8xwZIObLtl8IN1VFtPErHv2pKiWV0tTuemsI="
              width="700px"
              height="400px"
              id="cloud"
              className="imgeuh"
            />
            <h3 style={{ fontFamily: "monospace" }}>It's Cloudly</h3>
          </div>
        )}
        <button onClick={()=>navigate(-1)}>back</button>
      </div> 
    </div>
  );
};
export default Weather;
