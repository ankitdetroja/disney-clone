import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectLoginDetails,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          // console.log(result);
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Navmenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="Home"></img>
              <span>HOME</span>
            </a>
            <a href="">
              <img src="/images/search-icon.svg" alt="Search"></img>
              <span>SEARCH</span>
            </a>
            <a href="#rec">
              <img src="/images/watchlist-icon.svg" alt="Watchlist"></img>
              <span>WATCHLIST</span>
            </a>
            <a href="#ori">
              <img src="/images/original-icon.svg" alt="Original"></img>
              <span>ORIGINALS</span>
            </a>
            <a href="#ori">
              <img src="/images/movie-icon.svg" alt="Movie"></img>
              <span>MOVIES</span>
            </a>
            <a href="#ori">
              <img src="/images/series-icon.svg" alt="Series"></img>
              <span>SERIES</span>
            </a>
          </Navmenu>

          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
      {/* <Login onClick={handleAuth}>Login</Login> */}
    </Nav>
  );
};

const Nav = styled.nav`
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 1;
`;

const Logo = styled.a`
  width: 80px;
  max-height: 70px;
  display: flex;
  align-items: center;
  font-size: 0;

  img {
    display: block;
    width: 100%;
  }
`;

const Navmenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-right: auto;
  margin-left: 30px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 25px;
    img {
      height: 32px;
      width: 30px;
      min-width: 32px;
      padding-bottom: 3px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 18px;
      letter-spacing: 2px;
      /* margin-left: 5px; */
      white-space: nowrap;
      position: relative;

      &::before {
        content: "";
        background-color: rgb(249, 249, 249);
        position: absolute;
        bottom: -6px;
        left: 0px;
        right: 0px;
        height: 2px;
        width: auto;
        border-radius: 0 0 4px 4px;
        visibility: hidden;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span::before {
        visibility: visible;
        opacity: 1 !important;
        transform: scaleX(1);
      }
    }
  }

  @media (max-width: 786px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  width: 90px;
  top: 52px;
  right: 0px;
  left: -10px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
  padding: 5px 15px;
  font-size: 14px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  /* overflow: hidden; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
