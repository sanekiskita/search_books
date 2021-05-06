import React from "react";
import { connect } from "react-redux";
import { setBooks, setBooksImg, addCountBook } from "../../../redux/action";

function Arrow({
  ErrorSearch,
  searchBooksImg,
  books,
  CountBook,
  SearchLoad,
  setBooksImg,
  addCountBook,
}) {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    if (SearchLoad) {
      setText(<p className="_icon-spinner2"></p>);
    } else setText(<p className="text">ещё</p>);
  }, [SearchLoad]);

  return (
    <div>
      {ErrorSearch ? (
        <p className="Text__error">"Мы не смогли найти книги!"</p>
      ) : (
        <div
          className="Main__Arrow"
          onClick={async () => {
            addCountBook(20);
            setBooksImg(await searchBooksImg(books, CountBook));
          }}
        >
          {text}
          <div className="Arrow__Line left"></div>
          <div className="Arrow__Line right"></div>
        </div>
      )}
    </div>
  );
}
export default connect((state) => state, {
  setBooks,
  setBooksImg,
  addCountBook,
})(Arrow);
