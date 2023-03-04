import React, { useEffect, useState } from "react";

import axios from "axios";

import { Descriptions } from "antd";
import { DataType } from "@/types";

const UserDetail = (probs: any) => {
    const { userId } = probs;

    const [user, setUser] = useState<DataType>();

    console.log("userId: ", userId);
    const userList = async () => {
        const res = await axios.get(`/api/users/${userId}`);

        const data = res.data;
        console.log("detail 값: ", data);

        setUser(data);
    };

    useEffect(() => {
        userList();
    }, []);

    return (
        <Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="userId">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Title">{user?.age}</Descriptions.Item>
            <Descriptions.Item label="Id">{user?.userId}</Descriptions.Item>
        </Descriptions>
    );
};

export default UserDetail;
