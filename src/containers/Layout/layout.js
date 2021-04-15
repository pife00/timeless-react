import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

export default function Layout(props) {
  const classes = useStyles();
  return (
    <div>
      <div>{props.children}</div>
      <BottomNavigation className={classes.footer}>
        <BottomNavigationAction label="HOME" icon={<HomeIcon />} />
        <BottomNavigationAction label="LIST" icon={<ListIcon />} />
        <BottomNavigationAction label="USERS" icon={<AccessibilityIcon />} />
      </BottomNavigation>
    </div>
  );
}

const useStyles = makeStyles({
  footer: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});
