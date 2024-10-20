import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


function NewCardImage(props){
  
  const {novelId} = props;
  const [imageUrl, setImageUrl] = useState({})

  useEffect(() => {
    const ChapterList = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/novels/download/${novelId}`, {
          responseType: 'arraybuffer' // 바이너리 데이터로 응답받기
        });

        const base64 = btoa(
            new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const imageUrl = `data:image/png;base64,${base64}`;
        setImageUrl(imageUrl); // 이미지 URL을 설정
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);
        setImageUrl("/path/to/default/image.jpg"); // 오류 발생 시 기본 이미지 설정
      }
    };

    ChapterList();
  }, [novelId]);

  return(
    <img src={imageUrl} alt="사진없음" />
  )

}
export default NewCardImage;