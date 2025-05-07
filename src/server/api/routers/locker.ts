import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lockerRouter = createTRPCRouter({
  makeReservation: publicProcedure
    .mutation(() => {
      let qrString = ""
      for (var i = 0; i < 6; i++) {
        qrString = qrString + Math.floor(Math.random() * 10).toString()
      }
      return qrString
    }),
});

export type PackageRouter = typeof lockerRouter

