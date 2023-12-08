import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { EuiToolTip } from "@elastic/eui";
// ...

import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeTheme } from "../app/slices/AuthSlice";
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/firebaseConfig";
import { BreadCrumbsType } from "../utils/types";
import "./Header.css";


export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
  const mailId = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.email);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
    {
      text: "Dashboard",
    },
  ]);
  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);


  
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const logout = () => {
    signOut(firebaseAuth);
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#ff851b">NexTalk</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {mailId ? (
            <EuiText>
              <h4>
                <EuiTextColor color="white">Hi,  </EuiTextColor>
                <EuiTextColor color="#ff851b">{mailId}</EuiTextColor>
              </h4>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ gap: "3vw" }}
      >
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          {isDarkTheme ? (
            <EuiToolTip position="bottom" content="Change Mode">
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="m"
                color="warning"
                aria-label="theme-button-light"
              />
            </EuiToolTip>
          ) : (
            <EuiToolTip position="bottom" content="Change Mode">
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="m"
                color="ghost"
                aria-label="theme-button-dark"
              />
            </EuiToolTip>
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          <EuiToolTip position="bottom" content="Logout">
            <EuiButtonIcon
            
              onClick={logout}
              iconType="lock"
              style={{
                color: 'white',
                backgroundColor: '#ff851b',
                fontWeight: 'bolder',  // Make the text bold
              }}
              display="fill"
              size="m"
              aria-label="logout-button"
            />
          </EuiToolTip>
        </EuiFlexItem>
      </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#ff851b">NexTalk</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "3vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="m"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="m"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
            
              onClick={logout}
              iconType="lock"
              display="fill"
              size="m"
              aria-label="logout-button"
              style={{
                color: 'white',
                backgroundColor: '#ff851b',
                fontWeight: 'bolder',  // Make the text bold
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) {
      // sectionSpliced.splice(1, 1);
      // setSection(sectionSpliced);
      setIsResponsive(true);
    }
  }, []);
  const isMobileView = window.innerWidth < 480;
  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  );
}
