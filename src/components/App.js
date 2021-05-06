import React from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Popup/Popup";
import { connect } from "react-redux";

import "../index.scss";

function App({ selectBook }) {
  return (
    <div className="Container">
      <div className="Container__Osnova">
        <Header />
        <Main />
      </div>
      <Footer />
      {!!selectBook && <Popup />}
    </div>
  );
}

export default connect((state) => state, {})(App);
