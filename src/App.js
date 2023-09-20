import "./App.css";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import  { login }  from "./Routing/redux/loginRedux";
import {useSelector} from 'react-redux'
function App() {
  const loginValue = useSelector(state=>state.loginCredentials.value) ;
  const [inputValue, setInputValue] = useState({
    Email: "",
    password: "",
  });
  const [click, setClick] = useState({
    type: "",
  });
  const navigate = useNavigate();
  const [err, setErr] = useState({});
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!loginValue){
      submit();
    }
  },[loginValue])


  const validateForm = () => {
    let newError = {};
    if (inputValue.Email.length === 0 && click.type === "Email") {
      newError.Email = "Email is Required";
    } else if (
      !/\S+@\S+\.\S+/.test(inputValue.Email) &&
      inputValue.Email.length !== 0
    ) {
      newError.invalid = "Invaild Email Address";
    } else {
      newError.Email = "";
      newError.invalid = "";
    }

    if (!inputValue.password && click.type === "pass") {
      newError.password = "Password is Required";
    } else {
      newError.password = "";
    }
    setErr(newError);
  };

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    // validateForm();
  };

  const submit = async(e) => {
    e.preventDefault();
    validateForm();
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
          <p style={{ color: "red" }}>
            {!inputValue.Email ? err.Email : err.invalid ? err.invalid : ""}
          </p>
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
          <span style={{ color: "red" }}>{err.password}</span>
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
