import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem, checkOut } from "../../redux/shoppCart/slice";
import { useNavigate } from "react-router-dom";
export const ShoppingCart: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading);
  const items = useSelector((s) => s.shoppingCart.items);
  const token = useSelector((s) => s.user.token) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={items.map((s) => s.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={items
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={items
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (items.length <= 0) {
                    return;
                  }
                  dispatch(checkOut(token));
                  navigate("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      token,
                      itemIds: items.map((s) => s.id),
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
