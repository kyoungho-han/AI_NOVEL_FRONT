import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {useSelector } from 'react-redux';

function BookViewPage() {
  const accessToken = useSelector((state) => state.authToken);
  const { chapterId } = useParams();

  //소설 내용
  const [data, setData] = useState({})

  useEffect(() => {
    const ChapterList = async() => {
      try {
        
        const response =  await axios.get(`http://localhost:3000/chapters/${chapterId}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }).then(function(response) {
          setData(response.data)
        });
      } catch (error) {
        console.log(error);
      }
    }
    ChapterList()
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

  return(
    <div>{data.writing}</div>
  )
}
export default BookViewPage;