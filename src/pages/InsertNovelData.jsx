import React, {useContext, useEffect} from 'react';
import { NovelContext } from '../context/NovelContext';
import Button from 'react-bootstrap/Button';
import styles from '../style/InsertNovelData.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const InsertNovelData = () => {
  const { novelTitle, setNovelTitle, novelGenre, setNovelGenre, userName, setNovelId } = useContext(NovelContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNovelTitle('');
    setNovelGenre('추리');
  }, []);

  const handleSubmit = () => {
    const data = {
      title: novelTitle,
      genre: novelGenre,
      name: userName,
      isPublic: false
    };

    axios.post('http://localhost:3000/novels', data)
        .then(response => {
          const { novelId } = response.data;
          setNovelId(novelId);
          navigate(`/chapterListPage/${novelId}`);
        })
        .catch(error => {
          console.log(error);
        });
  };

  return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Detail of Novel</h1>
          <div className={styles.basic}>
            <label className={styles.labels}>소설 제목</label>
            <input
                type="text"
                value={novelTitle}
                onChange={(e) => setNovelTitle(e.target.value)}
            />
            <label className={styles.genre}>소설 장르</label>
            <select
                value={novelGenre}
                onChange={(e) => setNovelGenre(e.target.value)}
            >
              <option value="추리">추리</option>
              <option value="스릴러">스릴러</option>
              <option value="공포">공포</option>
              <option value="과학">과학</option>
              <option value="판타지">판타지</option>
              <option value="무협">무협</option>
              <option value="게임">게임</option>
              <option value="로맨스">로맨스</option>
              <option value="퓨전">퓨전</option>
              <option value="미스터리">미스터리</option>
              <option value="범죄">범죄</option>
              <option value="코미디">코미디</option>
              <option value="기타">기타</option>
            </select>
            <Button
                type="submit"
                className={styles.btn}
                variant="dark"
                onClick={handleSubmit}
            >
              입력완료
            </Button>
          </div>
        </div>
      </div>
  );
};

export default InsertNovelData;