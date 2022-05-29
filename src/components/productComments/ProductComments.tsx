import React from "react";
import { List, Comment } from "antd";

interface CommentType {
  author: string;
  avatar: string;
  content: string;
  createDate: string;
}
interface PropsType {
  data: CommentType[];
}
export const ProductComments: React.FC<PropsType> = ({ data }) => {
  return (
    <List
      dataSource={data}
      itemLayout="horizontal"
      renderItem={(item) => {
        return (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.createDate}
            ></Comment>
          </li>
        );
      }}
    ></List>
  );
};
