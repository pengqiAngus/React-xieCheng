import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";
export const SideMenu: React.FC = () => {
  return (
    <Menu mode={"vertical"} className={styles["side-menu"]}>
      {sideMenuList.map((s, i) => (
        <Menu.SubMenu
          key={`side-menu-${s.title}`}
          title={
            <span>
              <GifOutlined />
              {s.title}
            </span>
          }
        >
          {s.subMenu.map((j, k) => (
            <Menu.SubMenu
              key={`sub-menu-${j.title}`}
              title={
                <span>
                  {" "}
                  <GifOutlined /> {j.title}
                </span>
              }
            >
              {j.subMenu.map((n, m) => (
                <Menu.Item key={`sub-sub-menu-${n}`}>
                  {" "}
                  <span>
                    {" "}
                    <GifOutlined />
                    {n}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
