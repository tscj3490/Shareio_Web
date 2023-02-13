import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { getNftsOwnedBy } from "../contracts/contract";
import { useAccount } from "wagmi";

function NFTItem(props) {
  const metadata = props.nft && props.nft.metadata ? props.nft.metadata : {}

  return (
    <div className="col-12 col-sm-6 col-lg-3 item">
      <div className="card">
        <div className="image-over" onClick={(e)=>goDetail(idx, image, e)}>
            <img src={metadata.thumbnail || metadata.image} className="card-img-top" alt=""/>
        </div>

        <div className="card-footer">
          <h2>{props.nft.name}#{props.nft.token_id}</h2>
        </div>
      </div>
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 20rem;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;


  .card {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background-color: var(--card-bg-color);
    box-shadow: 0 3px 20px 0px var(--primary-l-color);
    transition-timing-function: cubic-bezier(.25, .25, .75, .75);
    transition-duration: 0.3s;
    transition-property: opacity, transform;
    .card-img-top {
        border-radius: 6px;
        height: 240px;
    }
    .card-body {
        flex: 1 1 auto;
        min-height: 1px;
        padding: 35px 0 0;
        h3, h4, h5, h6 {
            margin-top: 0;
        }
        .card-bottom {
            span {
                color: var(--white-color);
            }
        }
    }
    .card-footer {
        border-radius: 0;
        background: none;
        padding: 0;
        margin: 0 30px;
        border-top: 1px solid var(--primary-l-color);
        a {
            margin: 0 10px;
            &:not(.btn) {
                color: var(--primary-p-color);
            }
        }
        .card-footer i {
            margin: 0 5px 2.5px;
        }

        h2 {
          font-size: 16px;
          text-align: center;
        }
    }
    &:hover {
        .card-footer {
            color: #f5f5f5;
            border-color: rgba(255, 255, 255, 0.25);
        }
    }
    &.no-hover {
        border: none;
        box-shadow: none;
        &:hover {
            transform: inherit;
            box-shadow: none !important;
        }
    }
    &:not(.no-hover) {
        &:hover {
            transform: translateY(-5px);
        }
    }
    &.blog-card {
        .blog-thumb {
            img {
                border-radius: 6px;
            }
        }
        .blog-content {
            a {
                color: var(--white-color);
                transition: 0.3s;
                h4 {
                    transition: 0.3s;
                }
                &:hover {
                    color: var(--primary-color);
                    h4 {
                        color: var(--primary-color);
                    }
                }
            }
        }
    }
  }
`;
