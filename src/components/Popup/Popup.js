import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setBooks, setSelectBook } from "@redux/action";
//img
import nullAuthor from "@img/author/nullAuthor.jpg";

function Popup({ booksImg, books, selectBook, setSelectBook }) {
  const [imgAuthor, setImgAuthor] = React.useState(nullAuthor);

  const getUrlAuthor = async () => {
    try {
      await axios.get(
        `http://covers.openlibrary.org/a/id/${books[selectBook].author_key[0]}-M.jpg?default=false`,
        {}
      );
      setImgAuthor(
        `http://covers.openlibrary.org/a/id/${books[selectBook].author_key[0]}-M.jpg`
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  const exit = () => {
    document.body.style.overflow = "auto";
    setSelectBook(null);
  };
  React.useEffect(() => {
    getUrlAuthor();
  }, []);

  return (
    <div
      onClick={(e) => {
        if (e.target.className === "Popup") exit();
      }}
      className="Popup"
    >
      <div className="Popup__Content">
        <span
          onClick={() => {
            exit();
          }}
          className="Popup__exit"
        >
          x
        </span>

        <div className="Popup__info">
          <div className="Popup__Img">
            <img
              src={booksImg[selectBook].replace("-M", "-L")}
              alt={books[selectBook].title}
            ></img>
          </div>
          <div className="Popup__text">
            <div className="Popup__title">
              <h2>{books[selectBook].title}</h2>
            </div>
            <div className="Popup__author">
              <img src={imgAuthor} alt="автор"></img>
              <div className="Author">
                {books[selectBook].author_name !== undefined
                  ? books[selectBook].author_name.join(", ")
                  : "неизвестно"}
              </div>
            </div>
            <div className="Popup__language">
              Язык:{" "}
              <p>
                {!!books[selectBook].language
                  ? books[selectBook].language
                  : "неизвестно"}
              </p>
            </div>
            {
              <div className="Popup__Publish">
                Первая публикация в{" "}
                {!!books[selectBook].first_publish_year
                  ? `${books[selectBook].first_publish_year}`
                  : "неизвестно"}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => state, { setBooks, setSelectBook })(Popup);
