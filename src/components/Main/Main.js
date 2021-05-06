import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setBooks, setSelectBook, setBooksImg } from "../../redux/action";
//img
import imgCover from "../../img/cover.png";
//components
import Arrow from "./Arrow/Arrow";

function Main({
  booksImg,
  CountBook,
  search,
  setSelectBook,
  setBooks,
  books,
  setBooksImg,
}) {
  const [SearchPage, SetSearchPage] = React.useState(1);
  const [SearchLoad, SetSearchLoad] = React.useState(true);
  const [ErrorSearch, SetErrorSearch] = React.useState(false);

  let newSearchPage = SearchPage;
  let CancelToken = axios.CancelToken;
  let cancel;

  const getBooks = async () => {
    try {
      SetSearchLoad(true);
      const { data } = await axios.get(
        ` http://openlibrary.org/search.json?q=${
          !!search ? search.split(" ").join("+") : "JavaScript"
        }&page=${newSearchPage}`,
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
            return [];
          }),
        }
      );
      SetSearchLoad(false);
      return data;
    } catch (e) {
      return [];
    }
  };

  const getLinkImgBooks = async (book) => {
    /*
    const getstatus = async (link) => {
      try {
        const res = await axios.get(link, {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
            return [];
          }),
        });
        return res.status;
      } catch (e) {
        return 404;
      }
    };*/
    /*
    const getSrc = async (id, key, link, size) => {
      for (const element of id) {
        if (
          (await getstatus(
            `${link}${key}/${element}-${size}.jpg?default=false`
          )) !== 404
        ) {
          return element;
        }
      }
      return "";
    };*/

    let link = "http://covers.openlibrary.org/b/";
    let key = "";
    let value = "";
    let size = "M";

    if (!!book.cover_i) {
      value = book.cover_i;
      key = "id";
    } /*
    if (!!book.isbn && !value) {
      value = await getSrc(book.isbn, "isbn", link, size);
      key = !!value ? "isbn" : "";
    }*/

    return (value = !!value ? `${link}${key}/${value}-${size}.jpg` : imgCover);
  };

  const searchBooks = async () => {
    SetErrorSearch(false);
    let { docs } = await getBooks();
    if (!!docs.length) {
      let img = await searchBooksImg(docs);
      setBooks(docs);
      setBooksImg(img);
    } else {
      SetErrorSearch(true);
    }
  };

  const searchBooksImg = async (docs, start = 0) => {
    let img = [];
    if (docs.length >= start + 20) {
      for (let i = start; i < start + 20; i++) {
        img = [...img, await getLinkImgBooks(docs[i])];
      }
    } else {
      newSearchPage++;
      SetSearchPage(newSearchPage);
      let { docs } = await getBooks();
      if (!!docs.length) {
        let img = await searchBooksImg(docs);
        setBooks(docs);
        setBooksImg(img);
      } else {
        SetErrorSearch(true);
      }
    }
    return img;
  };

  React.useEffect(() => {
    if (cancel !== undefined) {
      cancel();
    }

    searchBooks();
  }, [search]);

  return (
    <div className="Main">
      <div className="Books">
        {books.map((book, index) => {
          return index < CountBook ? (
            <div
              key={index}
              data-id={index}
              className="Books__Item"
              onClick={(e) => {
                setSelectBook(e.currentTarget.dataset.id);
                document.body.style.overflow = "hidden";
              }}
            >
              <div className="Books__Item__img">
                <img
                  src={!!booksImg.length ? booksImg[index] : imgCover}
                  alt="book.title"
                ></img>
              </div>
              <div className="Books__Item__title">{book.title}</div>
              <div className="Books__Item__publish">
                Первая публикация в {book.first_publish_year}
              </div>
              {!!book.author_name ? (
                <div className="Books__Item__author">
                  Автор:{book.author_name.join(", ")}
                </div>
              ) : (
                <div className="Books__Item__author">Автор: нет данных</div>
              )}
            </div>
          ) : (
            ""
          );
        })}
      </div>
      <Arrow
        ErrorSearch={ErrorSearch}
        searchBooksImg={searchBooksImg}
        SearchLoad={SearchLoad}
      />
    </div>
  );
}

export default connect((state) => state, {
  setBooks,
  setSelectBook,
  setBooksImg,
})(Main);
