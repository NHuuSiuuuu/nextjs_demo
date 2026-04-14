"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  RegisterBodyType,
  RegisterBody,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/consfig";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log("data", values);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=" max-w-[600px] mx-auto"
    >
      Trang đăng ký tài khoản
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Full name</FieldLabel>
            <FieldContent>
              <Input {...form.register("name")} />
            </FieldContent>

            {/* Hiển thị lỗi */}
            {form.formState.errors.name && (
              <FieldError>{form.formState.errors.name.message}</FieldError>
            )}
          </Field>
          {/* EMAIL */}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input type="email" {...form.register("email")} />
            </FieldContent>

            {form.formState.errors.email && (
              <FieldError>{form.formState.errors.email.message}</FieldError>
            )}
          </Field>

          {/* PASSWORD */}
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input type="password" {...form.register("password")} />
            </FieldContent>

            {form.formState.errors.password && (
              <FieldError>{form.formState.errors.password.message}</FieldError>
            )}
          </Field>

          {/* CONFIRM PASSWORD */}
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <FieldContent>
              <Input type="password" {...form.register("confirmPassword")} />
            </FieldContent>

            {form.formState.errors.confirmPassword && (
              <FieldError>
                {form.formState.errors.confirmPassword.message}
              </FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <button type="submit" className="mt-4 border px-4 py-2">
        Đăng ký
      </button>
    </form>
  );
}
