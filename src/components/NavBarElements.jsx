import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Logout from '../pages/LogoutPage';

const NavBarElements = (props) => {
  const {at} = props;

  const location = useLocation();

  if (location.pathname === '/') {
    return null; // 루트 페이지에서 NavBarElements를 렌더링하지 않습니다.
  }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/main">
            <img
              alt="logo"
              src="/img/book.png"
              width="30"
              height="30"              
            />{' '}
              Dream Page
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/insertNovelData">소설 쓰러 가기</Nav.Link>
                <Nav.Link href="/bookList">소설 구경 가기</Nav.Link>
              </Nav>
              <Nav>
                {at || <Nav.Link href="/login">로그인</Nav.Link>}
                {at ||  <Nav.Link eventKey={2} href="/join">
                  회원가입
                </Nav.Link>}
                {at && <Nav.Link href="/myNovels">내 서제</Nav.Link>}
                {at && <Logout></Logout>}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavBarElements;