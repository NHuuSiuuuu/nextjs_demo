import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/login", body),

  // API bên next server
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "", // Nếu truyền '' → gọi API đến Next.js server
    }),

  //Gọi đăng xuất lên server (vì server check bằng Authorization)
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<any>("/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  logoutFromNextClientToNextServer: () =>
    http.post(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      },
    ),
};

export default authApiRequest;
