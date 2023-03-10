import React, { useEffect, useState } from "react";

import { Descriptions } from "antd";

import { UserType } from "@/types/index";
import axios from "axios";

interface IFoodData {
  name: string;
  price: number;
  content: string;
}

const BaordDetailPanel = (probs: any) => {
  const { boardId } = probs;
  console.log("boardId: ", boardId);

  const [data, setData] = useState<UserType>();
  useEffect(() => {
    /*

        fetch 사용 

        const fetchBoard = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${boardId}`);
            const json = await res.json();
            setData(json);
        };
        fetchBoard();
        */

    const nextTest = async () => {
      try {
        const res = await axios.get("/api/users");
        const data = res.data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    /*
       post;
       const postData = {
           email: "sdsd2112@naver.com",
           age: 51,
        };
        
        
        const nextTest = async () => {
            try {
                const res = await axios.post("/api/users", postData);
                const data = res.data;
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        */
    nextTest();
  }, [boardId]);

  // Descriptions

  return (
    <>
      {/* 
            <Descriptions title="User Info" layout="vertical">
                <Descriptions.Item label="userId">{data?.age}</Descriptions.Item>
                <Descriptions.Item label="Title">{data?.em}</Descriptions.Item>
                <Descriptions.Item label="Id">{data?.id}</Descriptions.Item>
            </Descriptions>
            */}
    </>
  );
};

export default BaordDetailPanel;
