import React from "react";
import { Button, Form, Input, InputNumber, Row, Col, Radio } from "antd";
import form from "antd/es/form";
import axios from "axios";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const UserNewPanel = () => {
    const postData = null;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const userEmail = values.user.email;
        const userAge = values.user.age;

        const postData = {
            email: userEmail,
            age: userAge,
        };

        nextTest(postData);

        /*
        const nextTest = async () => {
            try {
                const res = await axios.post("/api/users", postData);
                const data = res.data;
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        nextTest();
        */
    };

    const nextTest = async (postData: any) => {
        try {
            const res = await axios.post("/api/users", postData);
            const data = res.data;
            console.log("post success");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Row justify="center">
                <Col span={10}>
                    <Form
                        {...layout}
                        form={form}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name={["user", "email"]} label="Email" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={["user", "age"]} label="Age">
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};
export default UserNewPanel;
