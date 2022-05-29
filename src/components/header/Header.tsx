import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { changeLanguageActionCreator } from "../../redux//language/languageActions";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as defaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";
import { ShoppingCart } from "../../pages";

interface jwtPayload extends defaultJwtPayload {
  username: string;
}
export const Header: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
  const token = useSelector((s) => s.user.token);
  const [usename, setUsername] = useState("");
  useEffect(() => {
    console.log(shoppingCartItems);
  }, [shoppingCartItems]);
  useEffect(() => {
    if (token) {
      const tokenValue = jwt_decode<jwtPayload>(token);
      setUsername(tokenValue.username);
    }
  }, [token]);
  const dispatch = useDispatch();
  const LanguageChange = (e) => {
    const action = changeLanguageActionCreator(e.key);
    dispatch(action);
  };
  const onSignOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/");
  };
  const shoppingCart = () => {
    navigate("/shoppingCart");
  };
  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={LanguageChange}>
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {token ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text>{usename}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={shoppingCart}>
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onSignOut}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/signUp")}>注册</Button>
              <Button onClick={() => navigate("/logIn")}>登陆</Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            React旅游网
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={"请输入旅游目的地、主题、或关键字"}
          className={styles["search-input"]}
          onSearch={(keywords) => navigate("/search/" + keywords)}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key={1}>旅游首页</Menu.Item>
        <Menu.Item key={2}>周末游</Menu.Item>
        <Menu.Item key={3}>跟团游</Menu.Item>
        <Menu.Item key="4"> 自由行 </Menu.Item>
        <Menu.Item key="5"> 私家团 </Menu.Item>
        <Menu.Item key="6"> 邮轮 </Menu.Item>
        <Menu.Item key="7"> 酒店+景点 </Menu.Item>
        <Menu.Item key="8"> 当地玩乐 </Menu.Item>
        <Menu.Item key="9"> 主题游 </Menu.Item>
        <Menu.Item key="10"> 定制游 </Menu.Item>
        <Menu.Item key="11"> 游学 </Menu.Item>
        <Menu.Item key="12"> 签证 </Menu.Item>
        <Menu.Item key="13"> 企业游 </Menu.Item>
        <Menu.Item key="14"> 高端游 </Menu.Item>
        <Menu.Item key="15"> 爱玩户外 </Menu.Item>
        <Menu.Item key="16"> 保险 </Menu.Item>
      </Menu>
    </div>
  );
};
