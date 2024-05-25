import React from "react";
import axios from "axios";

import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import ThemeContext from "../../context/ThemeProvider";
import AuthContext from "../../context/AuthProvider";

export default function Profile() {

  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  const [image, setImage] = useState(null);

  const toastError = (err) => {
    toast.error(err, {
      position: "top-left",
      theme: theme,
      autoClose: 3000
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = image;
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);

    if (!auth._id) {
      toastError("You are not authorized!");
    }
    if (file.length === 0) {
      toastError("Choose the file first!");
      return;
    }
    if (file.length > 1) {
      toastError("You can choose only 1 file!");
      return;
    }

    try {
      const res = await axios.post(`images/avatar/${auth._id}`, formData,
        { headers: { 'Content-Type': 'image/jpg' } }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div id={theme} className="profile">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input name="image" onChange={e => setImage(e.target.files[0])} accept="image/png, image/jpeg" type="file" onSubmit={handleSubmit}></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}