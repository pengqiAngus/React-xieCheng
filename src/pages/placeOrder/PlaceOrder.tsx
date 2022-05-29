import React from "react";
import styles from "./PlaceOrder.module.css";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts";
import { Row, Col } from "antd";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";
export const PlaceOrder: React.FC = () => {
  const token = useSelector((s) => s.user.token) as string;
  const loading = useSelector((s) => s.order.loading);
  const order = useSelector((s) => s.order.currentOrder);
  const dispatch = useAppDispatch();
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ token, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
