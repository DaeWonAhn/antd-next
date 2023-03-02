import React from "react";

import BoardDetailPanel from "@/components/pages/board/BoardDetailPanel";
import router from "next/router";

const DetailPage = () => {
  const boardId = router.query.id;

  // const { boardId } = router.query;

  return <BoardDetailPanel boardId={boardId} />;
};

export default DetailPage;
