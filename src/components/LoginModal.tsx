/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";

const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<FormValues> = useCallback((values) => {
    void signIn("credentials", {
      ...values,
    });
  }, []);

  const handleClose = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Modal
      onClose={handleClose}
      openerButtonProps={{ children: "login", variant: "subtle" }}
    >
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col pb-2">
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="my-6 flex flex-col gap-3 px-6">
          <div className="flex flex-col gap-1">
            <Input
              type="text"
              maxLength={75}
              {...register("username")}
              placeholder="username"
            />
            <span className="pl-2 font-semibold text-red-500">
              {errors?.username?.message}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              maxLength={128}
              {...register("password")}
              placeholder="password"
            />
            <span className="pl-2 font-semibold text-red-500">
              {errors?.password?.message}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
