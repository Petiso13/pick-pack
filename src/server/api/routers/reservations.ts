import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const reservationsRouter = createTRPCRouter({
  createWithoutDates: publicProcedure
    .input(z.object({
      userId: z.string().min(1),
      lockerId: z.string().min(1),
      initialDate: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(reservations).values({
        userId: input.userId,
        lockerId: input.lockerId
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});
