import React, {useState} from 'react'
import styled from "styled-components";

const TextArea = (props) => {
  let { placeholder, error, label, value, className, onChange, ...rest } = props
  
  return (
    <Wrapper className={className}>
      <h4>{label}</h4>
      <textarea
        className="form-input-ta"
        placeholder={placeholder}
        onChange={(e) => {
          if(onChange) onChange(e.target.value)
        }}
        {...rest}
      >
        {value}
      </textarea>
      {error?.length > 0 && (
        <span className="error">{error}</span>
      )}
    </Wrapper>
  )
}

export default TextArea;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    font-family: "ResistSansBold", sans-serif;
    color: white;
    text-transform: uppercase;
    font-size: 1.8rem;
    line-height: 20px;
    letter-spacing: -5%;
    margin-bottom: 1rem;
  }
  form .form-item:not(:first-child) {
    margin-top: 3rem;
  }
  .form-input-ta {
    width: 55%;
    border-radius: 5px;
    height: 12rem;
    padding: 0.5rem 1.5rem;
    color: black;
    font-size: 1.6rem;
    font-family: "Poppins";
    resize: vertical;
  }
  .error {
    font-size: 12px;
    color: #f86969;
    margin-top: 2px;
    padding-left: 5px;
  }
`;
