import MainLayoutRoute from '../layout/main-layout'
import Payment from "../pages/Payment";
import Thanks from "../pages/Thanks";
import Nft from "../pages/Nft";
import { createBrowserRouter } from "react-router-dom";
import Account from '../pages/Account';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutRoute />,
    children: [
      {
        index: true,
        element: <Payment />
      },
      {
        path: "thanks",
        element: <Thanks />
      },
      {
        path: "nft",
        element: <Nft />
      },
      {
        path: "account",
        element: <Account />
      },
    ]
  },
]);
