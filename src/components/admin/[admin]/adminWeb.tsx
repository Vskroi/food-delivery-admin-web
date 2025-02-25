"use client";

import { useParams } from "next/navigation";

export default function Home() {
  const { admin } = useParams<{ admin: string }>();


  return (
    <>
<div>{admin}</div>
    </>
  );
}
