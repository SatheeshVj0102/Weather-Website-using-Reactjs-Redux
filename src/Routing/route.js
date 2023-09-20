import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "./dashboard";
import { configureStore } from "@reduxjs/toolkit";
import  weatherCheck from './redux/redux';

import { Provider } from "react-redux";
import login from "./redux/loginRedux";

const store = configureStore({
  reducer: {
    weatherDet :weatherCheck,
    loginCredentials:login
  },
});

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default AppRouter;
