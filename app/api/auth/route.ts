// /api/auth bằng POST thì hàm này chạy trên Next.js server
// Thằng này thực chất là để set cookie vào client
export async function POST(request: Request) {
  const res = await request.json(); // Lấy dữ liệu client gửi lên khi mà đã gọi api server backend
  const sessionToken = res.payload?.data?.token; // Lấy token từ data

  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      },
    );
  }
  // console.log(res);
  //   SET COOKIE
  return Response.json(res.payload, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
}


// Muốn server next set cookie thì làm như này à
