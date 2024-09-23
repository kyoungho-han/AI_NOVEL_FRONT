import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import style from "../style/BookViewPage.module.css"; // 스타일 파일 경로에 맞게 조정

function BookViewPage() {
  const accessToken = useSelector((state) => state.authToken);
  const { chapterId } = useParams();

  // 소설 내용
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
      <div className={style.container}>
        {loading ? (
            <div className={style.loader}>Loading...</div>
        ) : (
            <>
              <h1 className={style.title}>Chapter {data.chapterNumber}</h1>
              <div className={style.content}>
                {data.writing || "No content available"}
              </div>
            </>
        )}
      </div>
  );
}

export default BookViewPage;
