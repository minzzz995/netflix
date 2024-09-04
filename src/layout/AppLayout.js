import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext'; // Context import
import '../App.css';

const AppLayout = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // useDarkMode 훅으로 상태와 토글 함수 가져오기
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()

  const searchByKeyword=(event)=>{
    event.preventDefault();
    // url을 바꿔줘야 함
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  }

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Navbar expand="lg" className={isDarkMode ? 'navbar-dark-mode' : 'bg-body-tertiary'}>
        <Container fluid>
          {/* 로고를 클릭하면 "/"로 이동하도록 Link 컴포넌트를 사용 */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={isDarkMode ? "data:image/png;base64,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" : "data:image/png;base64,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"}
              alt="Netflix Logo"
              style={{ height: '40px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* Use Link components for navigation */}
              <Nav.Link as={Link} to="/" className={isDarkMode ? 'text-light' : ''}>Home</Nav.Link>
              <Nav.Link as={Link} to="/movies" className={isDarkMode ? 'text-light' : ''}>Movies</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className={`me-2 ${isDarkMode ? 'form-control-dark-mode' : 'form-control-light-mode'}`}
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" className={isDarkMode ? 'btn-outline-danger-dark-mode' : ''} type='submit'>Search</Button>
            </Form>
            {/* 다크 모드 토글 버튼 추가 */}
            <Button type="button" className="ms-2 btn btn-secondary" onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
