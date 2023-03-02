import React, { useState, useEffect } from "react";
import { Table, Tooltip, Row, Col, Button, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

import Router, { useRouter } from "next/router";
import router from "next/router";
import { DataType } from "../../../types/index";

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 0.5,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title, record) => (
      // <a onClick={() => alert(data.findIndex((item) => item.title === text))}>
      <a
        onClick={() => {
          router.push(`${router.pathname}/${record.id}`);
        }}
      >
        {title}
      </a>
    ),
    width: 150,
  },
];

const fnDetail = () => {
  alert("a");
};

const BoardList: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then(setData);
  }, []);

  console.log(data);

  return (
    <>
      <Row justify="end">
        <Col span={4}>
          <Button
            className="btn-default"
            onClick={() => router.push(`${router.pathname}/new`)}
          >
            추가
          </Button>
        </Col>
      </Row>
      <Row justify="end"></Row>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default BoardList;
