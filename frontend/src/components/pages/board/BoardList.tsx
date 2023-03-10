import React, { useState, useEffect } from "react";
import { Table, Tooltip, Row, Col, Button, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import Router, { useRouter } from "next/router";
import router from "next/router";
import { boardType, DataType } from "@/types/index";
import axios from "axios";

interface Iprops {
  boards: any;
}

const BoardList = ({ boards }: Iprops) => {
  const [board, setBoardList] = useState([]);

  const fetchBoardList = async () => {
    const res = await axios.get("/api/boards");
    const data = res.data;
    setBoardList(data);
  };

  useEffect(() => {
    fetchBoardList();
  }, []);
  const columns: ColumnsType<boardType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "등록일",
      dataIndex: "regDate",
      key: "regDate",
      width: 150,
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
  ];

  return (
    <>
      <Row justify="end">
        <Col span={4}></Col>
      </Row>

      <Row justify="end">
        <Col span={4}>
          <div style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              className="btn-default"
              onClick={() => router.push(`${router.pathname}/new`)}
            >
              추가
            </Button>
          </div>
        </Col>
      </Row>

      <Row justify="end"></Row>
      {boards.length && <Table columns={columns} dataSource={board} rowKey="_id" />}
    </>
  );
};

export default BoardList;
