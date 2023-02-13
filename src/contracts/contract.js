
import { ethers, BigNumber } from 'ethers';
import { TypedDataUtils } from 'ethers-eip712'
import ShareNFTAbi from './ShareNFTAbi.json'

export const SHARENFT_ADDRESS = '0x1247094A94e6c113628C191C56657Eb90b0Da797'
const GOERLI_PROVIDER = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
const SHARENFT_CONTRACT = new ethers.Contract(SHARENFT_ADDRESS, ShareNFTAbi, GOERLI_PROVIDER)

export const createPurchaseData = async (
  signer,
  contractAddr,
  tokenId,
  priceInUsd,
  domainName = "ShareNFT",
  version = "1.0") => {

  const domain = {
    name: domainName,
    version: version,
    chainId: await signer.getChainId(),
    verifyingContract: contractAddr
  };

  const types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    PurchaseData: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'priceInUsd', type: 'uint256' },
      { name: 'seller', type: 'address' }
    ]
  };

  const purchaseData = { tokenId, priceInUsd, seller: await signer.getAddress() };
  const digest = TypedDataUtils.encodeDigest({
      domain,
      types,
      primaryType: "PurchaseData",
      message: purchaseData
  });
  const signature = await signer.signMessage(digest);

  return {
      ...purchaseData,
      signature
  }
}

export const convertUsdToEth = (priceInUsd, ethInUsd) => {
  const USD_DECIMALS = 10 ** 8
  const ETH_DECIMALS = ethers.utils.parseEther('1')
  const priceInEth = BigNumber.from(priceInUsd).mul(USD_DECIMALS).mul(ETH_DECIMALS).div(ethInUsd).add(1)
  return priceInEth
}

export const convertEthToUsd = (priceInEth, ethInUsd) => {
  const USD_DECIMALS = 10 ** 8
  const ETH_DECIMALS = ethers.utils.parseEther('1')
  const priceInUsd = priceInEth.mul(ethInUsd).div(USD_DECIMALS).div(ETH_DECIMALS)
  return priceInUsd.toNumber()
}

export const mint = async (tokenUri, signer) => {
  console.log('--mint--', await signer.getAddress())
  const tx = await SHARENFT_CONTRACT.connect(signer).mint(tokenUri, await signer.getAddress())

  // run tx
  const txReceipt = await tx.wait()
  const tokenId = BigNumber.from(txReceipt.events?.[0].topics[3]).toNumber()
  return tokenId
}

export const beforePurchase = async (purchaseData, buyer) => {
  const ethInUsd = await SHARENFT_CONTRACT.getEthLatestPrice()
  let priceInEth = BigNumber.from(0)
  let gasPrice = BigNumber.from(0)

  try {
    priceInEth = convertUsdToEth(purchaseData.priceInUsd, ethInUsd)

    // get tx gas
    const txGas = await SHARENFT_CONTRACT.connect(buyer).estimateGas.purchase(purchaseData, { value: priceInEth })

    const gasPricePerGas = await GOERLI_PROVIDER.getGasPrice()
    // calc gas price of tx
    gasPrice = gasPricePerGas.mul(txGas)
  } catch (e) {
    // console.log(e);
  }
  

  return {
    nftPrice: Number(ethers.utils.formatEther(priceInEth)).toFixed(8),
    gasPrice: Number(ethers.utils.formatEther(gasPrice)).toFixed(8),
    totalPrice: Number(ethers.utils.formatEther(priceInEth.add(gasPrice))).toFixed(8)
  }
}

export const purchase = async (purchaseData, buyer) => {
  const ethInUsd = await SHARENFT_CONTRACT.getEthLatestPrice()
  const priceInEth = convertUsdToEth(purchaseData.priceInUsd, ethInUsd)

  const tx = await SHARENFT_CONTRACT.connect(buyer).purchase(purchaseData, { value: priceInEth })
  // run tx
  await tx.wait()
}

export const setRevenuePercents = async (walletAddr, signer) => {
  const tx = await SHARENFT_CONTRACT.connect(signer).setRevenuePercents(walletAddr, 1500)
  
  // run tx
  await tx.wait()
}

export const getRevenueInfo = async () => {
  const revenueCount = await SHARENFT_CONTRACT.getRevenueInfoCount()
  const revenues = []
  for (let i = 0; i < revenueCount; i ++) {
    const [recipient, percent] = await SHARENFT_CONTRACT.getRevenueInfo(i)
    revenues.push({recipient, percent})
  }

  return revenues
}

export const getEthLatestPrice = async () => {
  const ethInUsd = await SHARENFT_CONTRACT.getEthLatestPrice()
  return ethInUsd
}

export const getNftsOwnedBy = async (address) => {
  const moralisKey = '6VzWfGLdVSf64P4IWJ80opyAHhkfk4MiPwRwNMmXDdZAtxE4rZfGIWBj6EEcQjvM'
  const chain = 'goerli'
  const format = 'decimal'
  const tokenAddresses = [SHARENFT_ADDRESS]
  const baseUri = 'https://deep-index.moralis.io/api/v2'

  // const apiUri = `${baseUri}/${address}/nft?chain=${chain}&format=${format}`
  const apiUri = `${baseUri}/${address}/nft?chain=${chain}&format=${format}&token_addresses%5B0%5D=${tokenAddresses[0]}`
  return fetch(apiUri, {
    headers: {
      'X-API-Key': moralisKey,
      'accept': 'application/json'
    }
  }).then(r => r.json())
  .then(d => d.result)
}
