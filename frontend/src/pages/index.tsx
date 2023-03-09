import { DataType } from "@/types";
import React, { useEffect, useState } from "react";

const index = () => {
  const [user, setUser] = useState<DataType>();

  useEffect(() => {
    let user = localStorage.getItem("user") || "{}";
    let token = localStorage.getItem("token");
    // console.log("user: ", user?.toString());

    setUser(JSON.parse(user));
  }, []);
  return (
    <div>
      <h1>home</h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default index;
