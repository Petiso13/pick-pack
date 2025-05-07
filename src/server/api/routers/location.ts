import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  getCities: publicProcedure
    .query(() => {
      return ["Bariloche", "BsAs"]
    })
});

export type LockerRouter = typeof locationRouter


