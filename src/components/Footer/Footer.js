import React from "react";
import LibraryLogo from "../../img/logo/openlibrary-logo-tighter.svg";

function Footer() {
  return (
    <div className="Footer">
      <a
        href="https://github.com/sanekiskita"
        target="_blank"
        className="Footer__Git"
        rel="noreferrer"
      >
        <span></span>
        <p>Sanekiskita</p>
      </a>
      <a
        href="https://openlibrary.org/"
        target="_blank"
        className="Footer__Api"
        rel="noreferrer"
      >
        <img src={LibraryLogo} alt="LibraryLogo"></img>
      </a>
    </div>
  );
}

export default Footer;
