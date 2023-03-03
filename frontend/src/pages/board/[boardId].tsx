import React from "react";

import BoardDetailPanel from "@/components/pages/board/BoardDetailPanel";
import router, { useRouter } from "next/router";

const DetailPage = () => {
    const router = useRouter();

    return <BoardDetailPanel boardId={router.query} />;
};

export default DetailPage;
