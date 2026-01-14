import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Css/navbar.css";
import logo from "../assets/Logo.svg";

const Nav = ({ handleNavClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // hamburger menu
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // "More" dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // user menu
  const [user, setUser] = useState({ username: localStorage.getItem("username") || null });

  const navLinksRef = useRef(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((v) => !v);
    // keep dropdown closed when toggling top-level mobile menu
    setIsDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // prevent document click handler from immediately closing it
    setIsDropdownOpen((v) => !v);
  };

  const toggleUserMenu = (e) => {
    e && e.stopPropagation();
    setIsUserMenuOpen((v) => !v);
  };

  const handleNavClickLocal = (sectionId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  // Move overflowing links into dropdown (DOM manipulation)
  const adjustNav = () => {
    const nav = navLinksRef.current;
    const dropdown = dropdownRef.current;
    if (!nav || !dropdown) return;

    // reset dropdown content
    dropdown.innerHTML = "";
    const available = nav.offsetWidth - 500;
    let total = 0;

    // only consider non-"more" children
    const links = Array.from(nav.children).filter(
      (el) => !el.classList.contains("more")
    );

    // make sure they're visible (reset)
    links.forEach((el) => (el.style.display = "inline-flex"));

    for (let i = links.length - 1; i >= 0; i--) {
      total += links[i].offsetWidth;
      if (total > available) {
        // move the element into the dropdown (prepend so order stays correct)
        dropdown.prepend(links[i]);
      }
    }

    setHasOverflow(dropdown.children.length > 0);
  };

  useEffect(() => {
    adjustNav();
    window.addEventListener("resize", adjustNav);
    return () => window.removeEventListener("resize", adjustNav);
  }, []);

  // Close the dropdown if you click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if clicked outside the .more element, close dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".more")
      ) {
        setIsDropdownOpen(false);
      }
      // close user menu if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when any link inside the dropdown is clicked
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const onDropdownClick = (e) => {
      // If a link or button inside the dropdown is clicked, close menus.
      // matches either <a ...> or <button ...> (the link-button).
      const clicked = e.target.closest("a, button");
      if (clicked) {
        // Let the navigation happen, then close menus
        closeMenu();
      }
    };

    dropdown.addEventListener("click", onDropdownClick);
    return () => dropdown.removeEventListener("click", onDropdownClick);
  }, [dropdownRef.current]); // re-run if dropdownRef changes

  // Close the mobile menu when the route changes (covers Link navigation and programmatic navigate)
  useEffect(() => {
    // whenever location changes, ensure menus are closed
    closeMenu();
    // update user from storage (login may have changed it)
    setUser({ username: localStorage.getItem("username") || null });
    // we only need to run this when the pathname changes
  }, [location.pathname]);

  return (
    <nav className="Nav">
      <div className="site-inner">
        <img src={logo} alt="Logo" className="logo" />

        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`nav-links ${isOpen ? "show" : ""}`} ref={navLinksRef}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="link-button"
              onClick={() => {
                handleNavClickLocal("about-section");
                closeMenu();
              }}
            >
              About
            </button>
          </li>

          <li>
            <Link
              to="/menu"
              className={location.pathname === "/menu" ? "active" : ""}
              onClick={closeMenu}
            >
              Menu
            </Link>
          </li>

          <li>
            <Link
              to="/reservations"
              className={location.pathname === "/reservations" ? "active" : ""}
              onClick={closeMenu}
            >
              Reservations
            </Link>
          </li>

          <li>
            <Link
              to="/order-online"
              className={location.pathname === "/order-online" ? "active" : ""}
              onClick={closeMenu}
            >
              Order Online
            </Link>
          </li>

          <li ref={userMenuRef} className="user-menu">
            {user && user.username ? (
              <div className="user-button" onClick={toggleUserMenu}>
                <span style={{ marginRight: 6 }}>👤</span>
                <span>{user.username}</span>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        // logout
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        localStorage.removeItem("username");
                        setUser({ username: null });
                        setIsUserMenuOpen(false);
                        navigate("/login");
                        closeMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
