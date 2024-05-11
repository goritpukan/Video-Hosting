import React from "react";

export default function Loader(props) {
  return (
    <div className="loader-div" style={{"display": props.visible ? "flex" : "none"}}  >
      <div className="loader"></div>
    </div>
  )
}