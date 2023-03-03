import React, { useEffect, useState } from "react";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Table, Tooltip, Row, Col, Button, Divider } from "antd";

import { DataType } from "../../../types/index";

import router from "next/router";

const UserList = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            width: 0.5,
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
        // record 값을 이용한 로직 처리
        console.log(record.userId);
        userDelete(record.userId);
    };

    const [user, setUserList] = useState([]);
    const userList = async () => {
        const res = await axios.get("/api/users");
        const data = res.data;
        setUserList(data);
    };
    const userDelete = async (userId: any) => {
        const res = await axios.delete(`/api/users/${userId}`);
        console.log("delete success");
    };
    useEffect(() => {
        userList();
        console.log("userList", user);
    }, []);

    return (
        <>
            <Row justify="end">
                <Col span={4}>
                    <Button className="btn-default" onClick={() => router.push(`${router.pathname}/new`)}>
                        추가
                    </Button>
                </Col>
            </Row>
            <Row justify="end"></Row>
            {user.length && <Table columns={columns} dataSource={user} />}
        </>
    );
};

export default UserList;
