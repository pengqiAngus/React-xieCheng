import React from "react";
import { useParams, useMatch } from "react-router-dom";

export const Detail: React.FC = (props) => {
  console.log(useMatch);

  console.log(useParams());

  const { id } = useParams();
  return <div>详情页面 ID:{id}</div>;
};
