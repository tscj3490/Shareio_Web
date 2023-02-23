import React, { useState, useEffect, useMemo } from "react";
import InputBox from '../components/InputBox';
import styled from "styled-components";
import Button from '../components/Button';
import { createPurchaseData, mint, SHARENFT_ADDRESS } from "../contracts/contract";
import { useSigner } from "wagmi";

function Nft() {
  const [objectURL, setObjectURL] = useState(null)
  const [tokenId, setTokenId] = useState(0)
  const [progress, setProgress] = useState(false)
  const { data: signer } = useSigner()

  const handleMint = async () => {
    try {
      setProgress(true)
      const mintedTokenId = await mint(objectURL, signer)
      setTokenId(mintedTokenId)

      const purchaseData = await createPurchaseData(
        signer,
        SHARENFT_ADDRESS,
        mintedTokenId,
        100
      )
      
      localStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    } finally {
      setProgress(false)
    }
    
  }

  return (
    <Wrapper>
      <main className="nft-body">
        <div className="nft-form-area">
          <div className="nft-form">
            <InputBox label="Token URL:" type="text" value={objectURL} onChange={setObjectURL} className="mt-2"/>
            <div className="btn-row">
              <Button label="Mint" className="d-flex float-right" onClick={handleMint} disabled={progress}/>
            </div>
          </div>
          {tokenId != 0 && (
            <h5 className="nft-desc">
              Minted ShareNFT #{tokenId}
            </h5>
          )}
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
          margin-top: 2rem;
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
  
  .nft-desc {
    color: grey;
    font-size: 20px;
  }
`;
