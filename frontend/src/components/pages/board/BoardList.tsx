import React, { useState, useEffect } from "react";
import { Table, Tooltip, Row, Col, Button, Divider, Rate } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import Router, { useRouter } from "next/router";
import router from "next/router";
import { boardType, UserType } from "@/types/index";
import axios from "axios";
import { useGlobalContext } from "@/contexts/global";
import { title } from "process";
import BoardSearchForm from "./BoardSearchForm";

interface Iprops {
  boards: any;
}

const BoardList = ({ boards }: Iprops) => {
  const { user } = useGlobalContext();

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
      render: (title, record) => (
        <a onClick={() => router.push(`${router.pathname}/${record._id}`)}>{title}</a>
      ),
    },
    {
      title: "별점",
      width: 200,
      render: (title, record) => <Rate allowHalf defaultValue={2.5} />,
    },
    {
      title: "등록자",
      dataIndex: "regUserEmail",
      key: "regUserEmail",
      width: 150,
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
      <BoardSearchForm />

      <Row justify="end">
        <Col span={4}>
          <div style={{ display: "flex" }}>
            {user && (
              <Button
                style={{ marginLeft: "auto" }}
                className="btn-default"
                onClick={() => router.push(`${router.pathname}/new`)}
              >
                추가
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Row justify="end"></Row>
      {boards.length && <Table columns={columns} dataSource={board} rowKey="_id" />}
    </>
  );
};

export default BoardList;
