import envConfig from "@/consfig";
import { cookies } from "next/headers";

// Lấy thông tin tài khoản ( gửi session token)
export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log("sessionToken", sessionToken?.value);

  //   Tại vì api này là private nên khi gửi lên server backend cần gửi lên session toke
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
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
  console.log("result", result);
  return <div>Xin chào {result.payload.data.name}</div>;
}
