"use client";

import accountApiRequest from "@/apiRequests/account";
import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/consfig";
import { useContext, useEffect } from "react";

// Gọi ở client thì để HttpOnly: không cho phép trình duyệt (js) đọc đc cookie

export default function Profile() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(sessionToken);
      console.log("1212212", result);
    };
    fetchRequest();
  }, [sessionToken]);

  return <div>sessionToken</div>;
}
