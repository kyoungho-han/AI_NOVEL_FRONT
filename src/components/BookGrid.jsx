import React, { useState, useEffect } from "react";
import styles from "../style/BookGrid.module.css";
import axios from "axios";

function BookGrid(props) {
  const { datas = [], onClick, currentPage } = props; // 기본값을 빈 배열로 설정
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true); // 로딩 시작
      const newImageUrls = {};
      for (let data of datas) {
        try {
          const response = await axios.get(`http://localhost:3000/novels/download/${data.novelId}`, {});
          newImageUrls[data.novelId] = response.data.string;
        } catch (error) {
          console.log(error);
          newImageUrls[data.novelId] = "/path/to/default/image.jpg"; // 대체 이미지 설정
        }
      }
      setImageUrls(newImageUrls);
      setLoading(false); // 로딩 끝
    }

    // 데이터가 있을 때만 이미지 로드를 시도
    if (datas.length > 0) {
      fetchImages();
    }
  }, [datas, currentPage]); // datas 추가

  // datas가 비어 있으면 표시할 메시지
  if (!datas || datas.length === 0) {
    return <div>No data available</div>;
  }

  if (loading) { // 로딩 중일 때 메시지 표시
    return <div className={styles.loadingMessage}>소설을 불러오고 있습니다...</div>;
  }

  return (
      <div className={styles.grid}>
        {datas.map((data, index) => (
            <div key={index} className={styles.container}>
              <div className={styles.image}>
                <img
                    src={imageUrls[data.novelId] || ""} // 대체 이미지
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
