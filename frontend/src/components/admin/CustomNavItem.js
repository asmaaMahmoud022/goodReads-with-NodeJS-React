import React from "react";
import { NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

export default function CustomNavItem({ name, tab, activeTab, toggle }) {
  return (
    <NavItem>
      <NavLink
        className={classnames({ active: activeTab === tab })}
        onClick={() => {
          toggle(tab);
        }}
      >
        {name}
      </NavLink>
    </NavItem>
  );
}
