import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import styledComponents from 'styled-components';

const NavContainer = styledComponents.div`
min-height: 50px;
background: #212121;
color: #fff;
&.nav-container {
  display: flex;
  justify-content: space-between;
}

nav {
  display: flex;
  transition: 0.4s all;
}

.logo {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  font-weight: bold;
  cursor: pointer;
}

nav ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

nav ul > li {
  display: inline-block;
  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
    padding: 10px;
  }
  & a:hover {
    color: #212121;
    background: #fff;
  }
}

.items {
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  &.nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu-container {
    width: 100%;
  }
  .list {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
  .items {
    width: 100%;
  }

  nav ul > li {
    a {
      height: 100%;
      width: 100%;
      padding: 10px;
    }
  }
}

`

export default function Header() {

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  let navigate = useNavigate();


  let params = useLocation();
  let isDetailsPage = params.pathname.includes('/details/')

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 500) {
        setToggleMenu(false)
      } else {
        setToggleMenu(true)
      }
    }

    window.addEventListener('resize', changeWidth)
    changeWidth();
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, []);

  const onLogoClick = () => {
    let url = '/'

    if (isDetailsPage) {
      url = -1
    }

    navigate(url);
  }

  const html = {}


  html.backBtn = (
    <>
      &laquo; Movie details
    </>
  )

  html.logo = (
    <>
      Movie App
    </>
  )

  html.list = (
    <>
      <ul className='list'>
        <li className='items'><Link to="/">Home</Link></li>
        <li className='items'><Link to="/popular">Popular</Link></li>
        <li className='items'><Link to="/new-release">New Release</Link></li>
        <li className='items'><Link to="/about">About</Link></li>
      </ul>
    </>
  )

  html.button = (
    <button id="toggle-btn" className="btn" onClick={toggleNav} >&nbsp;</button>
  )
  return (
    <>
      <NavContainer className="nav-container">
        <div className="logo" onClick={onLogoClick}>
          {isDetailsPage ? html.backBtn : html.logo}
        </div>
        <div className="menu-container">

          {html.button}
          <nav>
            {toggleMenu && html.list}

          </nav>
        </div>
      </NavContainer>
    </>
  )
}
