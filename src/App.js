import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/StartPage';
import Main from './pages/Main';
import Login from './pages/LoginPage';
import UserJoin from './pages/UserJoinPage'
import ImageCreate from './components/ImageCreate'
import BookListPage from './pages/BookListPage';
import WriteChapter from './pages/WriteChapter';
import InsertNovelData from './pages/InsertNovelData';
import ChapterListPage from './pages/ChapterListPage';
import restProVider from 'ra-data-simple-rest'
import Logout from './pages/LogoutPage';
import MyNovels from './pages/MyNovels';
import NavBarElements from './components/NavBarElements';
import { NovelProvider } from './context/NovelContext';
import DetailPage from './pages/DetailPage';
import BookViewPage from './pages/BookViewPage';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from "react";

const dataProvider = restProVider('http://localhost:8080');


function App() {
  const accessToken  = useSelector((state) => state.authToken);
  
  const [userName, setUserName] = useState("")

  useEffect(() => {
   
    const fetchData = async () => {
      try {
       
        const response = await axios.get('http://localhost:3000/authors/name', {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        });
        return setUserName(response.data.name)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어 useEffect가 한 번만 실행되도록 설정

  return (
    <Router>
    <NovelProvider>
    <NavBarElements at={accessToken.authenticated} userName={userName}/>      
        <Routes>            
          <Route path='/' element={<Start/>}></Route>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/join' element={<UserJoin/>}></Route>
          <Route path='/imagecreate' element={<ImageCreate/>}></Route>
          <Route path = "/bookList" element = { <BookListPage /> } />
          <Route path = "/chapterListPage/:novelId" element = { <ChapterListPage /> } />
          <Route path = "/insertNovelData" element = { <InsertNovelData/> } />
          <Route path = "/writeChapter/:novelId/:chapterId" element = { <WriteChapter /> } />
          <Route path = "/myNovels" element = { <MyNovels />} />
          <Route path='/detail' element={<DetailPage/>}></Route>
          <Route path="/detail/:novelId" element={<DetailPage />} />
          <Route path='/bookView' element={<BookViewPage/>}/>
          <Route path='/bookView/:chapterId' element={<BookViewPage/>}/>
        </Routes>          
      </NovelProvider>
    </Router>
  );
}

export default App;
