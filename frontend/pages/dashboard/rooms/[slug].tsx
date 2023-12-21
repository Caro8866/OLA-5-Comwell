import React from "react";
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  return <div>Page {router.query.slug}</div>;
}

export default Page;
