import React from "react";
import router, { useRouter } from "next/router";
import UserDetail from "@/components/pages/user/UserDetail";

const detail = () => {
  const router = useRouter();

  const handleConfirm = (value: any) => {
    //logic
    console.log(value);
  };

  return (
    <div className="site-layout-content">
      <UserDetail userId={router.query?.userId} onConfirm={handleConfirm}></UserDetail>
    </div>
  );
};

export default detail;
