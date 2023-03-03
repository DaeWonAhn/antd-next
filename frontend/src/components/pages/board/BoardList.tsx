import React, { useState, useEffect } from "react";
import { Table, Tooltip, Row, Col, Button, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

import Router, { useRouter } from "next/router";
import router from "next/router";
import { DataType } from "../../../types/index";

interface Iprops {
    boards: any;
}

const fnDetail = () => {
    alert("a");
};

function BoardList({ boards }: Iprops) {
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
    ];

    /*
    fetch 예제
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then(setData);
    }, []);
    
    */

    return (
        <>
            <Row justify="end">
                <Col span={4}></Col>
            </Row>
            <Row justify="end"></Row>
            {boards.length && <Table columns={columns} dataSource={boards} />}
        </>
    );
}

export default BoardList;
