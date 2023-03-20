import { TRPCError } from "@trpc/server";
import { genSalt, hash } from "bcrypt";
import { signupSchema } from "~/common/signup-schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signupSchema.omit({ passwordConfirm: true }))
    .mutation(async ({ ctx: { prisma }, input: { username, password } }) => {
      const user = await prisma.user.findUnique({ where: { username } });

      if (user !== null)
        throw new TRPCError({
          code: "CONFLICT",
          message: "This username is already taken",
        });

      const hashedPassword = await hash(password, await genSalt());
      const createdUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return {
        ...createdUser,
        password,
      };
    }),
});
