import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../api";
import InputBox from '../components/InputBox';
import TextArea from '../components/TextArea';
import styled from "styled-components";
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import openCloseNav from "../helper/openclosenav";

function Payment() {
  const navigate = useNavigate();
  const [walletAdr1, setWalletAdr1] = useState(null);
  const [walletAdr2, setWalletAdr2] = useState(null);
  const [usdVal, setUsdVal] = useState(null);
  const [ethVal, setEthVal] = useState(null);
  const [gas, setGas] = useState(null);
  const [total, setTotal] = useState(null);
  const [description, setDescription] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  const [errorWalletAdr1, setErrorWalletAdr1] = useState(null);
  const [errorWalletAdr2, setErrorWalletAdr2] = useState(null);
  const [errorUsdVal, setErrorUsdVal] = useState(null);
  const [errorEthVal, setErrorEthVal] = useState(null);
  const [errorGas, setErrorGas] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorObjectUrl, setErrorObjectUrl] = useState(null);

  useEffect(() => {
    scrollToTop();
    openCloseNavbar();
  }, []);

  const handleMint = (event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (!walletAdr1) {
      setErrorWalletAdr1("Please enter from name.");
      return;
    } else {
      setErrorWalletAdr1(null);
    }

    if (!usdVal) {
      setErrorUsdVal("Please enter from email address.");
      return;
    } else {
      setErrorUsdVal(null);
    }
    
    if (!walletAdr2) {
      setErrorWalletAdr2("Please enter to name.");
      return;
    } else {
      setErrorWalletAdr2(null);
    }

    if (!ethVal) {
      setErrorEthVal("Please enter to email address.");
      return;
    } else {
      setErrorEthVal(null);
    }
    
    if (!gas) {
      setErrorGas("Please enter gas.");
      return;
    } else {
      setErrorGas(null);
    }

    if (!description) {
      setErrorDescription("Please fill description.");
      return;
    } else {
      setErrorDescription(null);
    }

  };

  const handleConnect = () => {

  }

  const handlePay = () => {

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
            <InputBox placeholder="Wallet Address 1:" label="Wallet Address 1:" type="text" value={walletAdr1} onChange={setWalletAdr1} className="mt-2" error={errorWalletAdr1}/>
            <InputBox placeholder="Wallet Address 2:" label="Wallet Address 2:" type="text" value={walletAdr2} onChange={setWalletAdr2} className="mt-2" error={errorWalletAdr2}/>
            <div className="btn-row">
              <Button label="Connect Wallet" className="d-flex float-right" onClick={handleConnect}/>
            </div>
            <div className="pay-row">
              <InputBox label="USD Value:" type="number" value={usdVal} onChange={setUsdVal} error={errorUsdVal}/>
              <InputBox label="Eth:" type="number" value={ethVal} onChange={setEthVal} error={errorEthVal}/>
              <InputBox label=" + Gas:" type="number" value={gas} onChange={setGas} error={errorGas}/>
              <InputBox label=" = Total:" type="number" value={total} onChange={setTotal} error={errorGas}/>
            </div>
            <div className="btn-row">
              <Button label="Pay Wallet 2" className="d-flex float-right" onClick={handlePay}/>
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
  
`;
