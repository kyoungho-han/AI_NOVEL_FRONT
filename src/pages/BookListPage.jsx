import React, { useState, useEffect } from "react";
import { Container } from "../style/container/Container.styled";
import { Header, MainHeader } from "../style/hearder/Header.styled";
import { useSelector } from 'react-redux';
import axios from "axios";
import PageNations from "../components/PageNation";
import BookGrid from "../components/BookGrid";
import { useNavigate } from "react-router-dom";

const BookListPage = () => {
  const [datas, setDatas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
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
        <BookGrid datas={currentPosts} onClick={handleTitleClick} currentPage={currentPage}></BookGrid>
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