import React, {useState} from 'react'
import styled from "styled-components";

const Button = (props) => {
  let { label, disabled, className, onClick, ...rest } = props
  
  return (
    <Wrapper className={className}>
      <button
        className="form-sbmt footer-btn"
        type="submit"
        disabled={disabled}
        onClick={() => {
          if(onClick) onClick()
        }}
        {...rest}
      >
        {label}
      </button>
    </Wrapper>
  )
}

export default Button;

const Wrapper = styled.div`
  .form-sbmt {
    border: 1px solid black;
    width: 25.9rem;
    cursor: pointer;
    margin-top: 3rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    height: 5rem;
  }
  .footer-btn {
    font-size: 1.7rem;
    color: #000;
    font-family: "ResistSansBold", sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.4s all;
    background-image: linear-gradient(
      90deg,
      rgba(78, 235, 192, 1) 10%,
      rgba(87, 51, 245, 1) 45%,
      rgba(235, 78, 230, 1) 104%
    );
    z-index: 1;
    height: 5rem;
    width: 25.9rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rem;
    position: relative;
    z-index: 2;
    border: 1px solid black;
    transition: all 0.4s;
  }
  
  .footer-btn:disabled,
  button[disabled] {
    border: 1px solid #999999;
    background: linear-gradient(
      90.32deg,
      #3f3c3c -3.32%,
      rgba(187, 107, 217, 0) 134.13%
    );
    color: #666666;
    cursor: initial;
  }
  
  .footer-btn::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(90deg, white 10%, white 45%, white 93%);
    z-index: -1;
    transition: opacity 0.3s linear;
    opacity: 0;
    border-radius: 10rem;
  }
  
  .footer-btn:disabled,
  button[disabled]::before {
    border: 1px solid #999999;
    background: linear-gradient(
      90.32deg,
      #3f3c3c -3.32%,
      rgba(187, 107, 217, 0) 134.13%
    );
    color: #666666;
    cursor: initial;
  }
  
  .footer-btn:hover::before {
    opacity: 1;
  }
`;
