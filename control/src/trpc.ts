import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@beamerstream/server";

export const trpc = createTRPCReact<AppRouter>();
