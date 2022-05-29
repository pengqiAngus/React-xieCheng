import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  HomePage,
  SignUp,
  LogIn,
  Detail,
  Search,
  ShoppingCart,
  PlaceOrder,
} from "./pages";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppCart/slice";
// const PrivateRoute = ({ component, isLogin, ...rest }) => {
//   const routeComponent = (props) => {
//     return isLogin ? (
//       React.createElement(component, props)
//     ) : (
//       <Navigate to="/logIn" />
//     );
//   };
//   return <Route render={() => routeComponent} {...rest}></Route>;
// };
function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getShoppingCart(token));
    }
  }, [token]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/logIn" element={<LogIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/search/:keywords" element={<Search />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/placeOrder" element={<PlaceOrder />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
