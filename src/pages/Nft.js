import React, { useState, useEffect, useMemo } from "react";
import api from "../api";
import InputBox from '../components/InputBox';
import TextArea from '../components/TextArea';
import styled from "styled-components";
import Button from '../components/Button';
import moment from 'moment'

function Nft() {
  const [objectURL, setObjectURL] = useState(null);
  const [errorObjectURL, setErrorObjectURL] = useState(null);
  useEffect(() => {
    
  }, []);

  const handleMint = () => {

  }
  return (
    <Wrapper>
      <main className="nft-body">
        <div className="nft-form-area">
          <div className="nft-form">
            <InputBox label="Token URL:" type="text" value={objectURL} onChange={setObjectURL} className="mt-2" error={errorObjectURL}/>
            <div className="btn-row">
              <Button label="Mint" className="d-flex float-right" onClick={handleMint}/>
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default Nft;

const Wrapper = styled.main`
  .nft-body {
    position: relative;
    margin-top: 20rem;
    margin-bottom: 20rem;
    .nft-form-area {
      max-width: 1054px;
      margin: 0 auto;
      padding: 0 15px;
      .nft-form {
        margin: auto;
        .btn-row {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
        .pay-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 5rem;
        }
      }
    }
  }
  
`;
