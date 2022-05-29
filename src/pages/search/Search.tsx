import React, { useEffect } from "react";
import styles from "./Search.module.css";
import { ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts";
export const Search: React.FC = () => {
  const { keywords } = useParams();
  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const productList = useSelector((state) => state.productSearch.data);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: keywords }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const onPageChange = (nextPage, pageSize) => {
    dispatch(
      searchProduct({
        nextPage: nextPage,
        pageSize: pageSize,
        keywords,
      })
    );
  };
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
      {/* 分类过滤器 */}
      {/* <div className={styles["product-list-container"]}>
          <FilterArea />
        </div> */}
      {/* 产品列表 */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
