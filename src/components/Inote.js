import React from "react";
import inote from "../img/inote.jpg"; // Assuming the img folder is one level up


const Inote = () => {
  return (
    <>
    <div>
      <h2>Hello Users</h2>
      <h2>Please Login and start adding your lists</h2>
      <div className="flex items-center justify-center my-5">
        <img src={inote} alt="" />
      </div>
    </div>
    </>
  );
};

export default Inote;
