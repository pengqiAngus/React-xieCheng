import React from "react";
import styles from "./LogInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { logIn } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { useEffect } from "react";
export const LogInForm: React.FC = (props) => {
  const loading = useSelector((state) => state.user.loading);
  const token = useSelector((state) => state.user.token);
  const error = useSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token]);
  const onFinish = (values: any) => {
    dispatch(logIn({ email: values.username, password: values.password }));
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={styles["register-form"]}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
