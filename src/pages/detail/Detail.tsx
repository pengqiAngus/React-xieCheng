import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Spin,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./Detail.module.css";
import { ProductIntro, ProductComments } from "../../components";
import { commentMockData } from "./mockup";
import { getproductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts";
import { addShoppingCartItem } from "../../redux/shoppCart/slice";

export const Detail: React.FC = (props) => {
  const { id } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const token = useSelector((s) => s.user.token);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
  const dispatch = useAppDispatch();
  const { RangePicker } = DatePicker;
  useEffect(() => {
    if (id) {
      dispatch(getproductDetail(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    return <h1>404!!!! Error</h1>;
  }
  return (
    <MainLayout>
      {/* 产品简介 与 日期选择 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: "block" }}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(
                  addShoppingCartItem({
                    token: token as string,
                    touristRouteId: id as string,
                  })
                );
              }}
            >
              <ShoppingCartOutlined /> 放入购物车
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode={"horizontal"}>
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Anchor.Link href="#fees" title="产品费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#comments" title="商品评价"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 产品特色 */}
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>产品费用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 预订须知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>预订须知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 商品评价*/}
      <div id="comments" className={styles["product-detail-container"]}>
        <ProductComments data={commentMockData} />
      </div>
    </MainLayout>
  );
};
