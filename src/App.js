import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public'
import {
  configureChains,
  createClient,
  goerli,
  WagmiConfig
} from 'wagmi'
import { router } from './routers/router'
import '@rainbow-me/rainbowkit/styles.css'
import "./css/stylev.css";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'shareio',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors
})

export const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#623485',
        accentColorForeground: 'black',
        borderRadius: 'large',
        fontStack: 'system',
      })}
      >
        <RouterProvider router={router} />
        <Toaster containerClassName="toast-container" />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
