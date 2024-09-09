import React from "react";
import axios from "axios";
import {useSelector } from 'react-redux';
import { useEffect, useState } from "react";


function NewCardImage(props){
  
  const {novelId} = props;
  const accessToken  = useSelector((state) => state.authToken);
  const [imageUrl, setImageUrl] = useState({})

  

  useEffect(() => {
    const ChapterList = async() => {
      try {
        
        const response =  await axios.get(`http://localhost:3000/novels/download/${novelId}`,{
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        }).then(function(response) {
          setImageUrl(response.data.string)
        });
      } catch (error) {
      }
    }
    ChapterList()
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되

 
  return(
    <img src={imageUrl} alt="사진없음" />
  )

}
export default NewCardImage;