import type { Song, Theme } from "@beamerstream/common";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import ResourceLoader from "./resources/ResourceLoader.js";
import { z } from "zod";
import { log } from "console";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

const ee = new EventEmitter();

function once<T>(init: () => Promise<T>) {
  let obj: Promise<T> | null = null;
  if (obj == null) obj = init();

  return () => obj;
}

// let i = 0;
// setInterval(() => {
//   ee.emit("add", "test " + i);
//   i++
// }, 1000);

const resources = new ResourceLoader();
let resourcesInit = false;
const loadResources = once(() => {
  console.log("Loading resources..");
  return resources.init();
});

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure.use(async ({ next }) => {
  if (!resourcesInit) {
    await loadResources();
    resourcesInit = true;
  }

  return next({
    ctx: {
      resources
    }
  });
});

export const appRouter = router({
  a: {
    b: {
      c: publicProcedure.query(({ ctx }) => {
        return ctx.resources.getSongs();
      })
    }
  },
  songs: publicProcedure.query(({ ctx }) => {
    return ctx.resources.getSongs();
  }),
  song: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.resources.getSong(input.id);
    }),
  currentSlide: publicProcedure.query(({ ctx }) => {
    // Slide?
    throw new Error("Not implemented");
  }),

  themes: publicProcedure.query(({ ctx }) => {
    const themes: Theme[] = [];
    return themes;
  }),

  applicationMode: publicProcedure.query((ctx) => {
    // string
    throw new Error("Not implemented");
  }),
  displays: publicProcedure.query((ctx) => {
    // Display[]
    throw new Error("Not implemented");
  }),

  setCurrentVerse: publicProcedure.mutation(({ ctx, input }) => {
    // String
    throw new Error("Not implemented");
  }),
  setDefaultTheme: publicProcedure.mutation(({ ctx, input }) => {
    // Bool
    throw new Error("Not implemented");
  })

  // https://trpc.io/docs/subscriptions
});

export type AppRouter = typeof appRouter;
