import { Routes , Route } from "react-router-dom";
import {useEffect} from "react";
import { useDispatch } from "react-redux";

import {
    onAuthStateChangedListener, 
    getUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";
import Home from "./routs/home/home.component";
import Navigation from "./routs/navigation/navigation.component";
import Authentication from "./routs/authentication/authentication.component";
import Shop from "./routs/shop/shop.component";
import Checkout from "./routs/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
          getUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
}, [dispatch])
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
