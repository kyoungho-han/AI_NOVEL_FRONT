import React from "react";
import style from "../style/DetailPage.module.css"

function DetailPageList(props){
  const {datas , onClick} = props;
  return(
    <div>
          {datas.map((chapter, index) => (
            <p  key={index} onClick={() => onClick(chapter.chapterId)}>{index+1}. {chapter.chapterName}</p>
          ))}
        </div>
  )

}
export default DetailPageList;