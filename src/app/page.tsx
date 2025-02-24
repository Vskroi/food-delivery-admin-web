"use client";

import { LoginFeatures } from "@/_features/Login/Login-Featuts";
import { Login } from "@/components/Login/Login";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/users");

      console.log(response);
      setLoading(false)
    } catch (errors) {
      console.log(errors);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <>
      <div>
        <Login></Login>
      </div>
    </>
  );
}
