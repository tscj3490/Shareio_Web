import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { getNftsOwnedBy } from "../contracts/contract";
import { useAccount } from "wagmi";
import ImageWrapper from "../components/ImageWrapper";

function NFTItem(props) {
  const metadata = props.nft && props.nft.metadata ? props.nft.metadata : {}

  return (
    <div className="card">
      <ImageWrapper
        src={metadata.thumbnail || metadata.image}
        className="card-img-top"
        alt="nft item"
      />
    </div>
  )
}

function Account() {
  const { address } = useAccount()
  const [nfts, setNfts] = useState(null)

  useEffect(() => {
    getNftsOwnedBy(address).then(d => setNfts(d.map(nft => ({
      ...nft,
      metadata: nft.metadata ? JSON.parse(nft.metadata) : {}
    }))))
  }, [address])


  console.log('-nfts-', nfts)
  return (
    <Wrapper>
      {nfts?.map(nft => (
        <NFTItem nft={nft}/>
      ))}
    </Wrapper>
  );
}

export default Account;

const Wrapper = styled.main`
  
`;
