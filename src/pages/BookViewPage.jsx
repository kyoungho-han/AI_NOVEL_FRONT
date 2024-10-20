import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import style from "../style/BookViewPage.module.css";
import {NovelContext} from "../context/NovelContext"; // 스타일 파일 경로에 맞게 조정

function BookViewPage() {
  const accessToken = useSelector((state) => state.authToken);
  const { chapterId } = useParams();
  const { novelId } = useContext(NovelContext);
  const navigate = useNavigate();

  // 소설 내용
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chapters/${chapterId}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [chapterId, accessToken.accessToken]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chapters/download/${chapterId}`, {
          responseType: 'arraybuffer' // 이미지 데이터를 바이너리 형식으로 가져오기
        });

        // arraybuffer 데이터를 Base64로 변환
        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        // Base64로 변환된 이미지를 설정
        const imageUrl = `data:image/png;base64,${base64}`;
        setImage(imageUrl); // 이미지 URL을 설정
      } catch (error) {
        console.log(error);
      }
    };

    fetchImage(); // 비동기 함수 호출
  }, [chapterId]);


  const goToChapterList = () => {
    navigate(`/detail/${novelId}`); // 목록 페이지로 이동
  };

  return (
      <div className={style.container}>
        {loading ? (
            <div className={style.loader}>Loading...</div>
        ) : (
            <>
              <h1 className={style.title}>Chapter: {data.chapterName}</h1>
              <div className={style.contentContainer}>
                <img src={image} alt="Chapter" className={style.chapterImage} />
                <div className={style.textContent}>
                  <div className={style.content}>
                    {data.writing || "작성된 챕터 내용이 없습니다."}
                  </div>
                </div>
              </div>
              <div className={style.buttonContainer}>
                <button onClick={goToChapterList} className={style.backButton}>
                  목록가기
                </button>
              </div>
            </>
        )}
      </div>
  );
}

export default BookViewPage;
