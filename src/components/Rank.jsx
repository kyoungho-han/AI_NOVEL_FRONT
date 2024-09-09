import React from "react";
import "../style/Rank.css"

function Rank(props){
  const {data ,onClick} = props;

  return(
    <div className="rank" onClick={onClick}>
    <span>{data.id}. </span>
    <span>{data.title}</span>
  </div>
  );
}
export default Rank;