import React, { useEffect } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Space } from "antd";

const Home = () => {
  const { Meta } = Card;

  useEffect(() => {}, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Space size={[8, 16]} wrap>
          {" "}
          <Card
            style={{ width: 300 }}
            cover={
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{ width: 300 }}
            cover={
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{ width: 300 }}
            cover={
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default Home;
