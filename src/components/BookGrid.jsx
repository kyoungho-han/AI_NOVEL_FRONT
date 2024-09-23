import React from "react";
import styles from "../style/BookGrid.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function BookGrid(props) {
  const { datas = [], onClick } = props;  // 기본값을 빈 배열로 설정
  const [imageUrls, setImageUrls] = useState({});
  const accessToken = useSelector((state) => state.authToken);

  useEffect(() => {
    async function fetchImages() {
      const newImageUrls = {};
      for (let data of datas) {
        try {
          const response = await axios.get(`http://localhost:3000/novels/download/${data.novelId}`, {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          });
          newImageUrls[data.novelId] = response.data.string;
        } catch (error) {
          console.log(error);
        }
      }
      setImageUrls(newImageUrls);
    }

    // 데이터가 있을 때만 이미지 로드를 시도
    if (datas.length > 0) {
      fetchImages();
    }
  }, [datas, accessToken]);

  // datas가 비어 있으면 표시할 메시지
  if (!datas || datas.length === 0) {
    return <div>No data available</div>;
  }

  return (
      <div className={styles.grid}>
        {datas.map((data, index) => (
            <div key={index} className={styles.container}>
              <div className={styles.image}>
                <img
                    src={imageUrls[data.novelId] || "default-image-url"}  // 이미지가 없으면 기본 이미지를 사용
                    alt="Book"
                />
              </div>
              <div className={styles.details}>
                <h2 onClick={() => onClick(data.novelId)}>{data.title}</h2>
                <p>{data.name}</p>
                <p>{data.genre}</p>
                <hr />
              </div>
            </div>
        ))}
      </div>
  );
}

export default BookGrid;
