import React, { useState, useEffect } from "react";
import openCloseNav from "../helper/openclosenav";
import logo from "../assets/images/logo.jfif";
import styled from "styled-components";

const Navigation = (props) => {

  return (
    <Wrapper>
      <div className="header">
        <div className="header-container">
          <div className="header-black">
            <div className="nav-area">
              <div className="nav-logo">
                <a href="/" className="nav-link">
                  <img src={logo} alt="logo" />
                </a>
              </div>
              <div className="nav-mob">
                <div className="nav-mob-nav">
                  <div className="nav-mob-ham">
                    <div className="container" onClick={() => openCloseNav()}>
                    </div>
                  </div>
                </div>
              </div>
              <nav>
                <ul className="nav-list">
                  <li className="nav-item gren">
                    <a href="/">PAYMENT</a>
                  </li>
                  <li className="nav-item gren">
                    <a href="/nft">NFT</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="navbar-mob">
          <div className="nav-mob-con">
            <div className="nav-mob-black">
              <nav className="nav-mob">
                <ul className="mob-nav-list">
                  <li className="nav-item-mob">
                    <a href="/">PAYMENT</a>
                  </li>
                  <li className="nav-item-mob">
                    <a href="/nft">NFT</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.main`
.header {
  position: fixed;
  top: 5rem;
  height: 77px;
  width: 100%;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-container {
    height: 100%;
    width: 85%;
    margin: auto;
    border: solid 3px transparent;
    border-radius: 40px 40px 40px 40px;
    background-image: linear-gradient(black, black),
      linear-gradient(
        270deg,
        #4eebc0 0,
        #5733f5 48.96%,
        #5733f5 73.96%,
        #eb4ee6 97.92%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-color: red;
    position: relative;
    transition: all 0.3s;
    .nav-logo img {
      width: 285px;
      height: auto;
    }
    
  }
  
  .header-container.bm {
    border-radius: 20px 20px 0px 0px;
  }

  .navbar-mob {
    display: none;
    position: fixed;
    top: 5rem;
    height: 60px;
    width: 85%;
    z-index: 15;
    transition: all 0.3s;
  }

  .nav-mob {
    display: block;

    .nav-mob-ham {
      color: white;
      .container {
        display: inline-block;
        cursor: pointer;
      }

      .bar1,
      .bar2,
      .bar3 {
        width: 30px;
        height: 3px;
        background-color: white;
        margin: 6px 0;
        transition: 0.4s;
        border-radius: 100px;
      }

      .change .bar1 {
        transform: translate(0, 8px) rotate(-45deg);
      }

      .change .bar2 {
        opacity: 0;
      }

      .change .bar3 {
        transform: translate(0, -10px) rotate(45deg);
      }
      img {
        width: 3rem;
        height: 2.1rem;
        cursor: pointer;
      }

      img:hover {
        opacity: 0.6;
      }
    }
  }
}
  
`;
