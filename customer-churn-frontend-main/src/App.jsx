import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Algorithms from "./pages/User/Algorithms/Algorithms.jsx";
import Insights from "./pages/User/Insights/Insights.jsx";
import Predict from "./pages/User/Predict/Predict.jsx";
import Profile from "./pages/User/Profile/Profile.jsx";
import PrivateRoutes from './helper/PrivateRoutes.jsx';
import './App.css'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route element={<Home />} path="/" exact /> 

          <Route element={<PrivateRoutes />}>
            <Route element={<Profile />} path="/profile" />
            <Route element={<Algorithms />} path="/algorithms" />
            <Route element={<Insights />} path="/insights" />
            <Route element={<Predict />} path="/predict" />
          </Route>
          <Route element={<Auth />} path="/auth"/>
          <Route element={<Login />} path="/login"/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
