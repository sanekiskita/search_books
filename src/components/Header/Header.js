import React from "react";
import { connect } from "react-redux";
import { setSearch, delBooks, delBooksImg } from "@redux//action";
//img
import LogoImg from "@img/Logo.jpg";

function Header({ setSearch, delBooks, delBooksImg, search }) {
  const [BookValue, setBookValue] = React.useState("");
  const [Timer, setTimer] = React.useState("");

  const clickSearch = () => {
    if (BookValue !== search) {
      offTimeout();
      delBooks();
      delBooksImg();
      setSearch(BookValue);
    }
  };

  const offTimeout = () => {
    if (!!Timer) {
      clearTimeout(Timer);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      clickSearch();
    }
  };

  React.useEffect(() => {
    offTimeout();
    setTimer(
      setTimeout(() => {
        clickSearch(BookValue);
      }, 2000)
    );
  }, [BookValue]);

  return (
    <div className="Header">
      <div className="Header__Logo">
        <img src={LogoImg} alt="Logo" />
      </div>

      <div className="Header__Input">
        <div className="Search">
          <input
            value={BookValue}
            type="text"
            onKeyPress={handleKeyPress}
            onChange={(e) => {
              setBookValue(e.target.value);
            }}
          ></input>
          <div
            className="Search__Button"
            onClick={() => {
              clickSearch();
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
      <div className="Header__Info">
        <ul>
          <li>
            <a href="#">О нас</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default connect((state) => state, { setSearch, delBooks, delBooksImg })(
  Header
);
