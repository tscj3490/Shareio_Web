import React, { useState, useEffect, useMemo } from "react";
import InputBox from '../components/InputBox';
import styled from "styled-components";
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import openCloseNav from "../helper/openclosenav";
import { beforePurchase, convertUsdToEth, getEthLatestPrice, getRevenueInfo, purchase, setRevenuePercents } from "../contracts/contract";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

function Payment() {
  const navigate = useNavigate();
  const [walletAdr1, setWalletAdr1] = useState(null);
  const [walletAdr2, setWalletAdr2] = useState(null);
  const [usdVal, setUsdVal] = useState(null);
  const [ethVal, setEthVal] = useState(null);
  const [gas, setGas] = useState(null);
  const [total, setTotal] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);
  const { data: signer } = useSigner();
  const { address: signerAddr } = useAccount();
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    scrollToTop();
    openCloseNavbar();

    updateNftInfo();
  }, []);

  useEffect(() => {
    beforePurchase(purchaseData, signer).then(({nftPrice, gasPrice, totalPrice}) => {
      setEthVal(nftPrice);
      setGas(gasPrice);
      setTotal(totalPrice);
    })
  }, [purchaseData, signerAddr])

  const updateNftInfo = async () => {
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
    const revenues = await getRevenueInfo()

    // purchaseData.tokenId = 3;
    setPurchaseData(purchaseData);

    revenues.length > 0 && setWalletAdr1(revenues[0].recipient);
    revenues.length > 1 && setWalletAdr2(revenues[1].recipient);

    setUsdVal(Number(purchaseData.priceInUsd));
  }

  const handleSetRevenues1 = async () => {
    await setRevenuePercents(walletAdr1, signer)
  }

  const handleSetRevenues2 = async () => {
    await setRevenuePercents(walletAdr2, signer)
  }

  const handlePurchase = async () => {
    setPurchasing(true)
    try {
      await purchase(purchaseData, signer)
    } finally {
      setPurchasing(false)
    }
    
  }

  const scrollToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  const openCloseNavbar = () => {
    const navMob = document.querySelector(".navbar-mob");
    if (navMob.style.display === "block") {
      openCloseNav();
    }
  };

  return (
    <Wrapper>
      <main className="payment-body">
        <div className="payment-form-area">
          <div className="payment-form">
            <div className="row">
              <InputBox placeholder="Wallet Address 1:" label="Wallet Address 1:" type="text" value={walletAdr1} onChange={setWalletAdr1} className="flex-1"/>&nbsp;&nbsp;&nbsp;
              <Button label="Set Revenues" className="d-flex float-right" onClick={handleSetRevenues1}/>
            </div>
            <div className="row mt-2">
              <InputBox placeholder="Wallet Address 2:" label="Wallet Address 2:" type="text" value={walletAdr2} onChange={setWalletAdr2} className="flex-1"/>&nbsp;&nbsp;&nbsp;
              <Button label="Set Revenues" className="d-flex float-right" onClick={handleSetRevenues2}/>
            </div>
            <div className="pay-row">
              <InputBox label="USD Value:" type="string" value={usdVal} disabled={true}/>&nbsp;&nbsp;&nbsp;
              <InputBox label="Eth:" type="string" value={ethVal} disabled={true}/>&nbsp;&nbsp;&nbsp;
              <InputBox label=" + Gas:" type="string" value={gas} disabled={true}/>&nbsp;&nbsp;&nbsp;
              <InputBox label=" = Total:" type="string" value={total} disabled={true}/>
            </div>
            <div className="btn-row">
              <Button label={purchasing ? "Purchasing..." : "Purchase"} className="d-flex float-right mt-2" onClick={handlePurchase} disabled={purchasing}/>
            </div>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default Payment;

const Wrapper = styled.main`
  .payment-body {
    position: relative;
    margin-top: 20rem;
    margin-bottom: 20rem;
    .payment-form-area {
      max-width: 1054px;
      margin: 0 auto;
      padding: 0 15px;
      .payment-form {
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
  
  .row {
    display: flex;
    flex-direction: row;
  }
`;
