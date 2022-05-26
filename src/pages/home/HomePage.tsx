import React, { useEffect } from "react";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartners,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./HomePage.module.css";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RooteState } from "../../redux/store";
import { getRecommendProductData } from "../../redux/recommandProducts/recommandProductsActions";
type PropsType = ReturnType<typeof mapToState> &
  ReturnType<typeof mapToDispatch>;
const HomePageComponent: React.FC<PropsType> = (props) => {
  const { productList, loading, error, getProductionList } = props;
  useEffect(() => {
    getProductionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();
  if (loading) {
    return (
      <Spin
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      ></Spin>
    );
  }
  if (error) {
    return <div>请求出错啦！！！！{error}</div>;
  }
  return (
    <div>
      <Header />
      <div className={styles["page-content"]}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              新品上市
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              国内游推荐
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        />
      </div>
      <BusinessPartners />
      <Footer />
    </div>
  );
};
const mapToState = (state: RooteState) => {
  return {
    loading: state.recommandProduct.loading,
    error: state.recommandProduct.error,
    productList: state.recommandProduct.productList,
  };
};
const mapToDispatch = (dispatch) => {
  return {
    getProductionList: () => {
      dispatch(getRecommendProductData());
    },
  };
};
export const HomePage = connect(mapToState, mapToDispatch)(HomePageComponent);
