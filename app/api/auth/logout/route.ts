import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    cookieStore.delete("sessionToken");
    return Response.json(
      {
        message: "Đã đăng xuất",
      },
      {
        status: 200,
      }
    );
  }

  try {
    const result =
      await authApiRequest.logoutFromNextServerToServer(
        sessionToken.value
      );

    cookieStore.delete("sessionToken");

    return Response.json(result.payload, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    }

    return Response.json(
      {
        message: "Lỗi không xác định",
      },
      {
        status: 500,
      }
    );
  }
}