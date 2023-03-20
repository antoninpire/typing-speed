/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { signupSchema } from "~/common/signup-schema";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import Modal from "~/components/ui/Modal";
import { api } from "~/utils/api";
import { toast } from "~/utils/toast";

const refinedSignupSchema = signupSchema.superRefine(
  ({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "The passwords don't match",
      });
    }
  }
);

type FormValues = z.infer<typeof refinedSignupSchema>;

const SignupModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(refinedSignupSchema),
  });
  const { mutate: signup, isLoading } = api.auth.signup.useMutation({
    onSuccess(user) {
      toast.success("Account created !");

      void signIn("credentials", {
        username: user.username,
        password: user.password,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSignup: SubmitHandler<FormValues> = useCallback(
    (values) => {
      signup({ password: values.password, username: values.username });
    },
    [signup]
  );

  const handleClose = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Modal
      onClose={handleClose}
      openerButtonProps={{ children: "signup", variant: "link" }}
    >
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="flex flex-col pb-2"
      >
        <h2 className="text-2xl font-bold">Signup</h2>
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
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              maxLength={128}
              {...register("passwordConfirm")}
              placeholder="password confirmation"
            />
            <span className="pl-2 font-semibold text-red-500">
              {errors?.passwordConfirm?.message}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Signup"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignupModal;
