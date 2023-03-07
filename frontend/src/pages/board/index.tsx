import React, { useState, useEffect } from "react";
import BoardList from "@/components/pages/board/BoardList";
import axios from "axios";

const index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axios.get("/api/boards");
        const data = res.data;
        console.log("data: ", data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getBoard();

    /*
        const postData = {
            email: "sdsd2112@naver.com",
            age: 51,
            title: "title01",
        };
        
        const nextTest = async () => {
            try {
                const res = await axios.post("/api/boards", postData);
                const data = res.data;
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        
        nextTest();
        */
  }, []);

  return (
    <div>
      <BoardList boards={data} />
    </div>
  );
};

export default index;
