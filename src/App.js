import { Routes , Route } from "react-router-dom";
import {useEffect, lazy, Suspense} from "react";
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";

import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routs/home/home.component"));
const Navigation = lazy(() => import("./routs/navigation/navigation.component"));
const Authentication = lazy(() => import("./routs/authentication/authentication.component"));
const Shop = lazy(() => import("./routs/shop/shop.component"))
const Checkout = lazy(() => import("./routs/checkout/checkout.component"));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
}, [dispatch])
  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
    
  );
}

export default App;
