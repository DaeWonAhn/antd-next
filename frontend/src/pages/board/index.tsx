import React, { useState, useEffect } from "react";
import BoardList from "@/components/pages/board/BoardList";
import axios from "axios";

const BoardListPage = () => {
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
  }, []);

  return <BoardList boards={data} />;
};

export default BoardListPage;
