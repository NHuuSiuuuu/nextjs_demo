import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import envConfig from "@/consfig";
import { cookies } from "next/headers";

// Lấy thông tin tài khoản ( gửi session token)
export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // console.log("sessionToken", sessionToken?.value);

  //   Tại vì api này là private nên khi gửi lên server backend cần gửi lên session toke
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  // console.log("result", result);
  return (
    <div>
      Xin chào {result.payload.data.name}
      <Profile />
    </div>
  );
}
