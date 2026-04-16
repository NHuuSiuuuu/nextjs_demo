"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/consfig";
import { toast } from "sonner";
import { useAppContext } from "@/app/AppProvider";

export default function LoginForm() {
  const { setSessionToken } = useAppContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
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
        // thành công
        toast.success("Đăng nhập thành công", { position: "top-right" });
        return data;
        // toast("Hello", {
        //   description: "Đây là mô tả",
        //   duration: 3000, // 3s
        // });
      });

      // Gửi dữ liệu login vừa nhận đc từ backend sang Next.js server (API Route)
      // api/auth - api này là của nextjs server (API Route)
      const resultFormNextServer = await fetch("api/auth", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
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
      setSessionToken(resultFormNextServer.payload.data.token);

      // console.log("data", resultFormNextServer);
    } catch (error) {
      const errors = (error as any).payload.errors as {
        field: string;
        message: string;
      }[]; // Ép kiểu : mảng có nhiều obj

      const status = (error as any).status as number;
      console.log(errors);
      if (status == 422) {
        errors.forEach((error) => {
          setError((error.field as "email") || "password", {
            // gán lỗi vào field tương ứng (email, pw)
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast.error((error as any).payload.message);
      }
    }
  }
  return (
    <div>
      Đăng nhập
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Email
          <input className="border-[4px] border-black" {...register("email")} />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          password
          <input
            className="border-[4px] border-black"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button className="border-[4px] border-black">Đăng nhập</button>
      </form>
    </div>
  );
}
