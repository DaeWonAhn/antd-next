import React from "react";
import router, { useRouter } from "next/router";
import UserDetail from "@/components/pages/user/UserDetail";

const detail = () => {
    const router = useRouter();

    return (
        <div className="site-layout-content">
            <UserDetail userId={router.query?.userId}></UserDetail>
        </div>
    );
};

export default detail;
