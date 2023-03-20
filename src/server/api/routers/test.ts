import type { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { z } from "zod";
import { gameTypeSchema } from "~/common/game-types";
import { timeFilterSchema } from "~/common/time-filters";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const createTestSchema = z.object({
  wpm: z.number().min(0),
  amountOfCorrectWords: z.number().min(0),
  amountOfIncorrectWords: z.number().min(0),
  amountOfCorrectCharacters: z.number().min(0),
  duration: z.number().min(0),
  type: gameTypeSchema,
});

export const testRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        time: timeFilterSchema,
        gameType: gameTypeSchema.optional(),
        duration: z.number().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const { time, gameType, duration } = input;

      const testWhereInput: Prisma.TestWhereInput = {};

      if (time === "THIS_YEAR")
        testWhereInput.createdAt = {
          gte: dayjs().startOf("year").toDate(),
          lte: dayjs().endOf("year").toDate(),
        };

      if (time === "THIS_MONTH")
        testWhereInput.createdAt = {
          gte: dayjs().startOf("month").toDate(),
          lte: dayjs().endOf("month").toDate(),
        };

      if (time === "TODAY")
        testWhereInput.createdAt = {
          gte: dayjs().startOf("day").toDate(),
          lte: dayjs().endOf("day").toDate(),
        };

      if (!!gameType) testWhereInput.type = gameType;

      if (!!duration) testWhereInput.duration = duration;

      return await prisma.test.findMany({
        orderBy: {
          wpm: "desc",
        },
        take: 100,
        select: {
          id: true,
          wpm: true,
          createdAt: true,
          duration: true,
          type: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        where: {
          ...testWhereInput,
        },
      });
    }),
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      const userTests = await prisma.test.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
        },
      });

      const allUsersTests = await prisma.test.findMany({
        select: { wpm: true, userId: true },
        where: {
          AND: [
            {
              userId: {
                not: userId,
              },
            },
            {
              userId: {
                not: null,
              },
            },
          ],
        },
      });

      const testsByUsers: Record<string, typeof allUsersTests> = {};

      allUsersTests.forEach((test) => {
        if (!!test.userId) {
          if (!!testsByUsers[test.userId])
            testsByUsers[test.userId]?.push(test);
          else testsByUsers[test.userId] = [test];
        }
      });

      const calculateMedian = (arr: number[]) => {
        const half = Math.floor(arr.length / 2);

        if (arr.length % 2 === 0)
          return ((arr[half - 1] ?? 0) + (arr[half] ?? 0)) / 2;

        return arr[half] ?? 0;
      };

      const allUsersMaxWpms: number[] = [];
      const allUsersTotalTests: number[] = [];

      Object.entries(testsByUsers).forEach(([_, tests]) => {
        allUsersMaxWpms.push(Math.max(...tests.map((test) => test.wpm)));
        allUsersTotalTests.push(tests.length);
      });

      const allUsersMaxWpmsMedian = calculateMedian(allUsersMaxWpms);
      const allusersTotalTestsMedian = calculateMedian(allUsersTotalTests);

      const allUsersWpms = allUsersTests.map((test) => test.wpm).sort();
      const allUsersWpmsMedian = calculateMedian(allUsersWpms);

      const userMeanWpm =
        userTests.length !== 0
          ? Math.round(
              userTests.reduce((total, test) => total + test.wpm, 0) /
                userTests.length
            )
          : 0;
      const userMaxWpm =
        userTests.length !== 0
          ? Math.max(...userTests.map((test) => test.wpm))
          : 0;
      const userTotalTests = userTests.length;

      const betterThanMean =
        allUsersWpmsMedian === 0
          ? 100
          : Math.min(Math.round((userMeanWpm * 50) / allUsersWpmsMedian), 100);
      const betterThanMax =
        allUsersMaxWpmsMedian === 0
          ? 100
          : Math.min(
              Math.round((userMaxWpm * 50) / allUsersMaxWpmsMedian),
              100
            );
      const betterThanTotal =
        allusersTotalTestsMedian === 0
          ? 100
          : Math.min(
              Math.round((userTotalTests * 50) / allusersTotalTestsMedian),
              100
            );

      return {
        tests: userTests,
        user,
        meanWpm: userMeanWpm,
        maxWpm: userMaxWpm,
        betterThanMean,
        betterThanMax,
        betterThanTotal,
      };
    }),
  create: publicProcedure
    .input(createTestSchema)
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      return await prisma.test.create({
        data: {
          ...input,
          userId: session?.user.id,
        },
      });
    }),
});
