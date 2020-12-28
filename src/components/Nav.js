import React, { useEffect, useState } from "react";
import "../componentsCss/Nav.css";

//FIX: https://www.youtube.com/watch?v=-cMqr9HpZ-Y&t=8247s

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      {/* https://pbs.twimg.com/profile_images/124011999041155 */}

      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/media/DlKNEufWsAAgr2E?format=jpg&name=small"
        alt="Profile Logo"
      />
    </div>
  );
}

export default Nav;
