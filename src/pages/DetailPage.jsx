import React from "react";
import style from "../style/DetailPage.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import {useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import DetailPageList from "../components/DetailPageList";
import { useNavigate } from "react-router-dom";

function DetailPage() {
  const accessToken = useSelector((state) => state.authToken);
  
  const { novelId } = useParams();
  
  //챕터 리스트
  const [chaterList, setChapterList] = useState([]);

  //소설 데이터
  const [nobelData, setNovelData] = useState({});

  //사진 url
  const [novelImage, setnovelImage] = useState({})

  const navigate = useNavigate();
  
 //챕터리스트 불러오기
  useEffect(() => {
    const ChapterList = async() => {
      try {
       
        const response =  await axios.get(`http://localhost:3000/chapters?novelId=${novelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }).then(function(response) {
        setChapterList(response.data.dtoList)
        });
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login")
      }
    }
    ChapterList()
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

  //소설 불러오기
  useEffect(() => {
    const ChapterList = async() => {
      try {
       
        const response =  await axios.get(`http://localhost:3000/novels/${novelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }).then(function(response) {
          setNovelData(response.data);
        });
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login")
      }
    }
    ChapterList()
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

// 소설 사진 가져오기
  useEffect(() => {
    const ChapterList = async() => {
      try {
       
        const response =  await axios.get(`http://localhost:3000/novels/download/${novelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }).then(function(response) {
          setnovelImage(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    ChapterList()
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

  const openBookView = async (chapterId) =>{
    if(accessToken.authenticated){
      navigate(`/bookview/${chapterId}`)
    }
    else{
      alert("로그인을 해주세요");
      navigate("/login")
    }
   
  }
  
  return(
    <div className={style.container}>
      <img src={novelImage.string} alt="page"></img>
      <div className={style.bookData}>
        <h2>{nobelData.title}</h2>
        <h3>{nobelData.name}</h3>
        <p>좋아요 ㅁ</p>
        <div>
         <DetailPageList datas={chaterList} onClick={openBookView}></DetailPageList>
        </div>
      </div>
      
    </div>
  );
}export default DetailPage;