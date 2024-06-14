import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom/dist";
import PropTypes from "prop-types";
import Margin from "../components/Margin";
import Header from "../components/Header";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    (alert("로그인이 필요합니다."), (<Navigate to="/login" />))
  );
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Margin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/detail/:id"
          element={<PrivateRoute element={Detail} />}
        />

        <Route
          path="/login"
          element={<PublicRoute element={Login} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={Signup} />}
        />
        <Route
          path="/mypage"
          element={<PrivateRoute element={MyPage} />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default Router;
