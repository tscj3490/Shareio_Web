import React, {useState} from 'react'
import styled from "styled-components";
import checked from "../assets/images/checked.svg";
import unchecked from "../assets/images/unchecked.svg";

const CheckBox = (props) => {
  let { label, isChecked, className, onClick, ...rest } = props
  
  return (
    <Wrapper className={className}>
      <img
        className="checkbox-image"
        src={isChecked ? checked : unchecked}
        alt="checkbox"
        onClick={() => {
          if(onClick) onClick()
        }}
        {...rest}
      />
      <p>
          {label}
      </p>
    </Wrapper>
  )
}

export default CheckBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  margin-right: 2rem;
  p {
    font-size: 1.8rem;
    line-height: 20px;
    color: white;
    letter-spacing: -5%;
    margin-top: 2px;
  }
  
  .checkbox-image {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
`;
