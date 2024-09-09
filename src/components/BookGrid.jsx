import React from "react";
import styles from "../style/BookGrid.module.css";

function BookGrid(props) {
  const { datas, onClick } = props;

  if (!datas || datas.length === 0) {
    return <div>No data available</div>;
  } else {
    return (
      <div>
        {datas.map((data, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.image}>
            <img src="img/images.png" alt="Book" />
          </div>
          <div className={styles.details}>
            <h2 onClick={() => onClick(data.novelId)}>{data.title}</h2>
            <p>{data.name}</p>
            <p>{data.genre}</p>
            <hr/>
          </div>          
        </div>
        ))}
      </div>

    );
  }
}

export default BookGrid;