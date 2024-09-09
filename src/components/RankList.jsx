import React from "react";
import Rank from "./Rank";

function RankList(props){

  const {datas ,onClickItem} = props;

  return(
    <div>
      {datas.map((data, index) =>{
        return(
          <Rank 
          key={data.id} 
          data={data} 
          onClick={() =>{onClickItem(data)}} ></Rank>
        )
      })}
    </div>
  )
}
export default RankList;