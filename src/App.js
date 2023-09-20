import "./App.css";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import  { login }  from "./Routing/redux/loginRedux";
import {useSelector} from 'react-redux'
function App() {
  const loginValue = useSelector(state=>state.loginCredentials.value) ;
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    Email: "",
    password: "",
  });
  const [click, setClick] = useState({
    type: "",
  });

  useEffect(()=>{
    if(!loginValue){
      submit();
    }
  },[loginValue])

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async(e) => {
    e.preventDefault();
    setFlag(true);

      dispatch(login({inputValue}))
      navigate("/dashboard");
      
  };

  return (
    <div>
      <center style={{ marginTop: "12%" }}>
        <div style={{ marginRight: "16%" }}>
          <h3>LOGIN</h3>
        </div>
        <br></br>
        <form onSubmit={submit}>
          <input
            type="text"
            name="Email"
            value={inputValue.Email}
            className="form-controlInput"
            onChange={handleChange}
            onClick={() => setClick({ type: "Email" })}
            placeholder="Email address"
          />
          <br />
          <br></br>
          <input
            type="password"
            name="password"
            value={inputValue.password}
            className="form-controlInput"
            onChange={handleChange}
            placeholder="password"
            required
            onClick={() => setClick({ type: "pass" })}
          />
          <br></br>
          <br></br>
          <br></br>
          <input
            required
            type="submit"
            className="button"
            name="submit"
            disabled={!inputValue.Email  || !/\S+@\S+\.\S+/.test(inputValue.Email) || !inputValue.password }
          /> 
        </form>
      </center>
    </div>
  );
}

export default App;
