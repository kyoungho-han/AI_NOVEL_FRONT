import React from "react";
import cover from "../images/StartImage1.jpeg"
import "../style/Book.css"

function Book(props) {

  const {data, onClick} = props;

  return(
    <div className="Book" onClick={onClick}>
      <img src={cover} alt="" /> 
      <div className="explanation">
        <h2>제목 : {data.title}</h2>
        <p>작가 : {data.author}</p>
        <p>페이지수 : {data.pageNum}</p>
      </div>
    </div>
  );

}
export default Book;