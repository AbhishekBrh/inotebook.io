import React, { useState,  } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contex/notes/NoteState";
import Signin from "./components/Signin";
import Logon from "./components/Logon";
import Alert from "./components/Alert";
import Inote from "./components/Inote";


const App = () => {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/inote" element={<Inote/>} />
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Logon showAlert={showAlert} />} />
              <Route path="/signup" element={<Signin showAlert={showAlert} />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
