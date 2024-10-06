import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


function NewCardImage(props){
  
  const {novelId} = props;
  const [imageUrl, setImageUrl] = useState({})



  useEffect(() => {
    const ChapterList = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/novels/download/${novelId}`);

        // 응답 데이터에서 문자열이 없거나 비어있는 경우 처리
        if (response.data.string) {
          setImageUrl(response.data.string);
        } else {
          // 그림이 없을 경우에 대한 처리 (예: 기본 이미지 URL 설정)
          setImageUrl(null); // null 또는 빈 문자열로 설정
        }
      } catch (error) {

      }
    };

    ChapterList();
  }, [novelId]); // novelId가 변경될 때마다 useEffect가 실행됨

 
  return(
    <img src={imageUrl} alt="사진없음" />
  )

}
export default NewCardImage;