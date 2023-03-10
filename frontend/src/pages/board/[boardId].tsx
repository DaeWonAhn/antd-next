import React from "react";

import BoardDetailPanel from "@/components/pages/board/BoardDetailPanel";
import { useRouter } from "next/router";

const BoardDetailPage = () => {
  const router = useRouter();

  return <BoardDetailPanel boardId={router.query?.boardId} />;
};

export default BoardDetailPage;
