import React from "react";
import router, { useRouter } from "next/router";
import UserDetail from "@/components/pages/user/UserDetail";

const UserDetailPage = () => {
  const router = useRouter();

  const handleConfirm = (value: any) => {
    //logic
    console.log(value);
  };

  return <UserDetail userId={router.query?.userId} onConfirm={handleConfirm} />;
};

export default UserDetailPage;
