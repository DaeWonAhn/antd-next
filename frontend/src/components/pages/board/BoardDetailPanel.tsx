import React, { useEffect, useState } from "react";

import { Alert, Button, Descriptions, Form, Input, message, Modal, Rate } from "antd";

import { boardType } from "@/types/index";
import axios from "axios";
import moment from "moment";
import router from "next/router";
import TextArea from "antd/es/input/TextArea";
import { useGlobalContext } from "@/contexts/global";

const BaordDetailPanel = (probs: any) => {
  const { boardId } = probs;
  const [form] = Form.useForm();
  const { user } = useGlobalContext();

  const [board, setBoard] = useState<boardType>();

  const [error, setError] = useState<any>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [isUser, setIsUser] = useState(false);

  // useEffect hook
  useEffect(() => {
    fetchBoardDetail();
  }, [boardId]);

  // fechBoard
  const fetchBoardDetail = async () => {
    try {
      const res = await axios.get(`/api/boards/${boardId}`);
      setBoard(res.data);

      // board 등록자, global user info
      // 일치하면
      if (res.data?.regUserEmail === user?.email) {
        setIsUser(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 삭제 handle
  const handleBoardDelete = () => {
    Modal.confirm({
      title: "삭제",
      content: "선택한 항목을 삭제하시겠습니까?",
      onOk: () => {
        deleteBoard();
      },
    });
  };

  const deleteBoard = async () => {
    try {
      const res = await axios.delete(`/api/boards/${boardId}`);
      message.info("삭제되었습니다");

      router.push("/board");
    } catch (err) {
      console.log(err);
    }
  };

  // 수정 handle
  const handleFinish = (values: any) => {
    updateBoard(values);
  };

  const updateBoard = async (paychData: any) => {
    try {
      const res = await axios.patch(`/api/boards/${boardId}`, paychData);
      message.info("수정되었습니다");

      router.push("/board");
    } catch (e: any) {
      console.error(`${e}`);
      message.error(`${e}`);
      setError(e);
    }
  };

  if (!board) {
    return <>{"loading..."}</>;
  }
  return (
    <>
      {error && <Alert type="error" showIcon message={`${error}`} />}
      {isEditMode ? (
        <Form
          form={form}
          initialValues={{
            title: board.title,
            content: board.content,
          }}
          onFinish={handleFinish}
        >
          <Descriptions bordered title="Board Info" column={1}>
            <Descriptions.Item label="Title">
              <Form.Item name="title">
                <Input style={{ width: 300 }} />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="content">
              <Form.Item name="content">
                <TextArea rows={6} style={{ width: 800 }} />
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
          <Descriptions title="Board Info" layout="vertical">
            <Descriptions.Item label="title">{board?.title}</Descriptions.Item>
            <Descriptions.Item label="등록일">
              {moment(board?.regDate).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="EMAIL">{board?.regUserEmail}</Descriptions.Item>
            <Descriptions.Item label="contnet">
              <TextArea rows={6} value={board?.content} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="별점" layout="vertical">
            <Descriptions.Item>
              <Rate allowHalf defaultValue={2.5} />
            </Descriptions.Item>
          </Descriptions>
          {isUser && (
            <div style={{ float: "right" }}>
              <Button
                className="btn-default"
                onClick={() => {
                  setEditMode(!isEditMode);
                }}
              >
                수정
              </Button>
              <Button className="btn-default" onClick={handleBoardDelete}>
                삭제
              </Button>
            </div>
          )}{" "}
        </>
      )}
    </>
  );
};

export default BaordDetailPanel;
