"use client";

/**
 * FLOW đăng xuất: Bình thường đăng xuất là xóa mỗi cookie trên trình duyệt
 * muốn thực sự đăng xuất phải xóa hẳn sessionToken bên backend
 * next client gọi đến next server xóa cookie (vì next client kh xóa đc)
 * next server gọi lên server backend gọi api xóa sessionToken
 *
 * Cách làm: next client gọi api post đăng xuất đến next server
 * khi đó next server xóa cookie và gọi hàm đăng xuất đến server backend
 *
 */

import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    await authApiRequest.logoutFromNextClientToNextServer();
    router.push("/login");
  };
  return (
    <div>
      <Button size={"sm"} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
}
