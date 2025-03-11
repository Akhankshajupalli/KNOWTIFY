
import Header from "./header";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const location = useLocation();

  // List of routes where footer should NOT appear
  const noFooterRoutes = ["/signin", "/register", "/dashboard"];

  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
