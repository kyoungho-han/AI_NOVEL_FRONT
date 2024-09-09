import React, { useState, useEffect } from "react";
import { Container } from "../style/container/Container.styled";
import { Header, MainHeader } from "../style/hearder/Header.styled";
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken } from '../storage/Cookie';
import axios from "axios";
import PageNations from "../components/PageNation";
import BookGrid from "../components/BookGrid";
import styles from "../style/BookListPage.module.css";
import Stack from 'react-bootstrap/Stack';
import { requestToken } from '../api/Users';
import { SET_TOKEN } from '../store/Auth';
import NavBarElements from "../components/NavBarElements"
import { useNavigate } from "react-router-dom";
import DetailPage from "./DetailPage";




const BookListPage = () => {
  const [novels, setNovels] = useState([]);
  const [datas, setDatas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.accessToken}`;
        const response = await axios.get('http://localhost:3000/novels', {
          params: { 
            isBest: true,
            size: 100
          }
        });
        setDatas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

  

  const currentPosts = datas.dtoList?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTitleClick = async(novelId) => {
    navigate(`/detail/${novelId}`)
  }
  
  return (
    <div>      
      <Container>
      
       <br></br>
        <Header>
          <MainHeader>
            <h1>소설 게시판</h1>
          </MainHeader>
        </Header>
        <br/><br/>
        <div className={styles.genre}>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">전체</div>
            <div className="p-2">추리</div>
            <div className="p-2">스릴러</div>
            <div className="p-2">공포</div>
            <div className="p-2">과학</div>
            <div className="p-2">판타지</div>
            <div className="p-2">무협</div>
            <div className="p-2">게임</div>
            <div className="p-2">로맨스</div>
            <div className="p-2">퓨전</div>
            <div className="p-2">미스터리</div>
            <div className="p-2">범죄</div>
            <div className="p-2">코미디</div>
            <div className="p-2">기타</div>
          </Stack>
          <br/><br/>
        </div>
        <BookGrid datas={currentPosts} onClick={handleTitleClick}></BookGrid>
        <br />
        <div className="d-flex justify-content-center">
          <PageNations
            postsPerPage={postsPerPage}
            totalPosts={datas.dtoList?.length}
            paginate={setCurrentPage}
          ></PageNations>        
        </div>
      </Container>
    </div>
  );
};

export default BookListPage;