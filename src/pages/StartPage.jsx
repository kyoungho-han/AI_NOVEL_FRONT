import React from "react";
import { Link } from "react-router-dom";
import StartImage1 from '../images/StartImage.jpeg'
import StartImage2 from '../images/StartImage1.jpeg'
import StartImage3 from '../images/StartImage3.jpeg'
import style from "../style/Start.module.css"
import { DELETE_TOKEN } from '../store/Auth';
import { useDispatch } from 'react-redux';



function Start() {  
  const dispatch = useDispatch();
  function TokenDelete(){
    dispatch(DELETE_TOKEN())
  }

  return(
    <div className={style.startPage}>
      <div className={style.left}>
        <h2>AI와 함께 작가의 꿈을 키워보세요</h2>
        <p>누구나<br/>작가가 될 수 있다</p>
        <Link  className={style.startButton} onClick={TokenDelete} to="/main">시작하기</Link>
      </div>
      <div className={style.right}>
        <div className={style.top}>
          <img className={style.image1} src={StartImage1} art=""></img>
          <img className={style.image2} src={StartImage2} art=""></img>
        </div>
        <img className={style.image3} src={StartImage3} art=""></img>
      </div>
    </div>
  );
}
export default Start;