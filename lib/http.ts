import envConfig from "@/consfig";

// HttpError giải quyết tạo ra loại lỗi riêng cho HTTP giúp
/**
 * - Phân biệt lỗi rõ ràng
 */

class HttpError extends Error {
  status: number; // Khai báo thuộc tính kiểu numb 200 401 422 500
  payload: any; // Lưu giẽ liệu backend trả về

  //   Hàm khởi tạo nhận vào 1 obj dùng destructuring { status, payload }
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status; // gán dữ liệu backend vào
    this.payload = payload;
  }
}

// ------------------------------------------------------------------------------------------------------------

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};
/**
Type RequestInit là kiểu
    fetch(url, {
    method: "POST",
    headers: {},
    body: "...",
    credentials: "include",
    });

    type A = { name: string };
    type B = { age: number };
    type C = A & B;
C sẽ là:
    {
    name: string;
    age: number;
    }

&: gộp
Dùng toàn bộ option của fetch + option custom riêng
*/
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string, //endpoint: "/account/me", "/auth/login"...
  option?: CustomOptions | undefined, //  // options thêm (headers, body, baseUrl...)
) => {     
  // Nếu có body thì stringify vì fetch yêu cầu string
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  // Nếu không truyền baseUrl → dùng env
  // Nếu truyền → dùng cái truyền vào
  // Nếu truyền '' → gọi vào Next.js server 
  const baseUrl =
    option?.baseUrl == undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : option.baseUrl;

  // Ghép URL:
  // "/me" → baseUrl + /me
  // "me" → baseUrl + /me (tránh lỗi thiếu /)
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  // Gọi hàm để chạy
  const res = await fetch(`${fullUrl}`, {
    ...option,
    headers: {
      ...baseHeaders, // mặc định: Content-Type
      ...option?.headers,
    },
    body, //body đã stringify ở trên
    method, //method truyền vào (GET, POST...)
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    throw new HttpError(data);
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined, // Omit nghĩa là CustomOption nhưng bỏ field body vì get không có body
  ) {
    return request<Response>("GET", url, options);
  },

  //   post(url, body, options?) vì trong options có body nên phải bỏ body đi
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
