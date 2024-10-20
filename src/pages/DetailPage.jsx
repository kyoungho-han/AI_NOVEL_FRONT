import React, {useContext} from "react";
import style from "../style/DetailPage.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import {useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import DetailPageList from "../components/DetailPageList";
import { useNavigate } from "react-router-dom";
import {NovelContext} from "../context/NovelContext";

function DetailPage() {
  const accessToken = useSelector((state) => state.authToken);
  const { setNovelId } = useContext(NovelContext);

  const { novelId } = useParams();

  const [chapterList, setChapterList] = useState([]);
  const [novelData, setNovelData] = useState({});
  const [novelImage, setNovelImage] = useState("");

  const navigate = useNavigate();

  // 챕터 리스트 불러오기
  useEffect(() => {
    const fetchChapterList = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chapters?novelId=${novelId}`, {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` }
        });
        setChapterList(response.data.dtoList);
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login");
      }
    };
    fetchChapterList();
  }, [novelId, accessToken, navigate]);

  // 소설 정보 불러오기
  useEffect(() => {
    const fetchNovelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/novels/${novelId}`, {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` }
        });
        setNovelData(response.data);
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login");
      }
    };
    fetchNovelData();
  }, [novelId, accessToken, navigate]);

  // 소설 이미지 불러오기
  useEffect(() => {
    const fetchNovelImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/novels/download/${novelId}`, {
          responseType: 'arraybuffer', // 바이너리 데이터로 응답받기
          headers: { Authorization: `Bearer ${accessToken.accessToken}` }
        });

        // base64로 인코딩
        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        // data URL 형식으로 이미지 설정
        setNovelImage(`data:image/png;base64,${base64}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNovelImage();
  }, [novelId, accessToken]);

  const openBookView = (chapterId) => {
    if (accessToken.authenticated) {
      navigate(`/bookView/${chapterId}`);
      setNovelId(novelId);
    } else {
      alert("로그인을 해주세요");
      navigate("/login");
    }
  };

  return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img src={novelImage} alt="Book Cover" className={style.bookImage} />
        </div>
        <div className={style.bookData}>
          <h2 style={{fontWeight: 'bold'}}>{novelData.title}</h2>
          <div style={{fontSize: "larger"}}> 작가: {novelData.name}</div>
          <div style={{fontSize: "larger"}}> 장르: {novelData.genre}</div>
          <div>
            <DetailPageList datas={chapterList} onClick={openBookView} />
          </div>
        </div>
      </div>
  );
}

export default DetailPage;
