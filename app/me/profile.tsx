"use client";

import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/consfig";
import { useContext, useEffect } from "react";

// Gọi ở client thì để HttpOnly: không cho phép trình duyệt (js) đọc đc cookie

export default function Profile() {
  const { sessionToken } = useAppContext();

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        },
      ).then(async (res) => {
        const payload = await res.json();

        const data = {
          status: res.status,
          payload: payload,
        };

        if (!res.ok) {
          throw data;
        }
        return data;
      });
      // console.log("resulssst", result);
    };
    fetchRequest();
  }, [sessionToken]);

  return <div>sessionToken</div>;
}
