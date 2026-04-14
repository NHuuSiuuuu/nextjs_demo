"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterBodyType,
  RegisterBody,
} from "@/schemaValidations/auth.schema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });

  return (
    <div>
      LoginForm
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          <input className="border-[4px] border-black" {...register("name")} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        
        <div>
          <input className="border-[4px] border-black" {...register("email")} />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        
        <div>
          <input
            className="border-[4px] border-black"
            type="password"
            {...register("password")}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        
        <div>
          <input
            className="border-[4px] border-black"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </div>
        
        <input className="border-[4px] border-black" type="submit" /> 
      </form>
    </div>
  );
} 