import React from "react";
import Book from "./Book";

function BookList(props){
const {datas ,onClickItem} = props;

    return(
      <div>
        {datas.map((data, index) =>{
          return(
            <Book 
            key={data.id} 
            data={data} 
            onClick={() =>{onClickItem(data)}} ></Book>
          )
        })}
      </div>
    )
}

export default BookList