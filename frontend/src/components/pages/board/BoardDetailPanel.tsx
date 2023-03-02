import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Descriptions } from "antd";

import { DataType } from "@/types/index";

const BaordDetailPanel = (probs : any) => {
  const router = useRouter();
  const { boardId } = router.query;

  const [data, setData] = useState<DataType>();
  useEffect(() => {
    const fetchBoard = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${boardId}`
      );
      const json = await res.json();
      setData(json);
    };
    fetchBoard();
  }, [boardId]);

  console.log(data);
  // Descriptions

  return (
    <>
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="userId">{data?.userId}</Descriptions.Item>
        <Descriptions.Item label="Title">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="Id">{data?.id}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default BaordDetailPanel;
