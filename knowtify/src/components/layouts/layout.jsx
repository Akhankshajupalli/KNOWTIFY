
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

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
