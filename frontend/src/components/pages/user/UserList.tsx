import React, { useEffect, useState } from "react";
import router from "next/router";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Table, Row, Col, Button, Modal, Alert, message } from "antd";
import { UserType } from "@/types/index";

const UserList = () => {
  const [user, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<any>(null);

  const columns: ColumnsType<UserType> = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: 0.5,
      render: (email, record) => (
        <a onClick={() => router.push(`${router.pathname}/${record.userId}`)}>{email}</a>
      ),
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: 150,

      render: (text, record) => <a onClick={() => handleRowClick(record)}>Delete</a>,
    },
  ];

  const handleRowClick = (record: any) => {
    Modal.confirm({
      title: "삭제",
      content: "선택한 항목을 삭제하시겠습니까?",
      onOk: () => {
        deleteUser(record.userId);
      },
    });
  };

  const fetchUserList = async () => {
    const res = await axios.get("/api/users");
    const data = res.data;
    setUserList(data);
  };

  // 삭제
  const deleteUser = async (userId: string) => {
    setLoading(true);

    try {
      const res = await axios.delete(`/api/users/user-id/${userId}`);
      message.info("삭제되었습니다");

      fetchUserList();
    } catch (e: any) {
      console.error(`${e}`);
      message.error(`${e}`);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      {error && <Alert type="error" showIcon message={`${error}`} />}

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
      <Table
        dataSource={user}
        columns={columns}
        loading={loading}
        rowKey={(record) => {
          return record._id;
        }}
      ></Table>
    </>
  );
};

export default UserList;
