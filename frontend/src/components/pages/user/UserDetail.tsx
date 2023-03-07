import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { Descriptions, Button, Input, Form, Alert, Space, message } from "antd";
import { DataType } from "@/types";

const UserDetail = (props: any) => {
  const { userId, onConfirm } = props;

  const [form] = Form.useForm();
  const router = useRouter();

  const [user, setUser] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!userId) return;

    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    if (!user) return;

    form.setFieldsValue({
      email: user.email,
      age: user.age,
    });
  }, [user]);

  // 수정
  const handleFinish = (values: any) => {
    onConfirm(values);

    updateUser(values);
  };

  const updateUser = async (paychData: any) => {
    try {
      const res = await axios.patch(`/api/users/${userId}`, paychData);
      router.push("/user");

      console.log("update success");
    } catch (e: any) {
      console.error(`${e}`);
      message.error(`${e}`);
      setError(e);
    }
  };

  // 상세
  const fetchUserDetail = async () => {
    try {
      const res = await axios.get(`/api/users/${userId}`);

      const data = res.data;
      console.log("detail 값: ", data);

      setUser(data);
    } catch (e) {
      console.error(`${e}`);
      message.error(`${e}`);
      setError(e);
    }
  };

  if (!user) {
    return <>{"loading..."}</>;
  }

  return (
    <>
      {error && <Alert type="error" showIcon message={`${error}`} />}
      {isEditMode ? (
        <Form
          form={form}
          initialValues={{
            email: user.email,
            age: user.age,
          }}
          onFinish={handleFinish}
        >
          <Descriptions bordered title="User Info" column={1}>
            <Descriptions.Item label="Email">
              <Form.Item label="Email" name="email">
                <Input style={{ width: 300 }} />
              </Form.Item>
            </Descriptions.Item>

            <Descriptions.Item label="age">
              <Form.Item label="age" name="age">
                <Input style={{ width: 300 }} />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="수정">
              <Form.Item>
                <Button htmlType="submit">confirm</Button>
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
        </Form>
      ) : (
        <>
          <Descriptions bordered title="User Info" column={1}>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="age">{user.age}</Descriptions.Item>
            <Descriptions.Item label="수정">
              <Button
                className="btn-default"
                onClick={() => {
                  setEditMode(!isEditMode);
                }}
              >
                수정하기
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  );
};

export default UserDetail;
