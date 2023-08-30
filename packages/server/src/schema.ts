import fs from "node:fs";
import { PhysicalDisplay } from "@beamerstream/library";
import { PubSub } from "graphql-subscriptions";
import ResourceLoader from "./resources/ResourceLoader.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createRequire } from "node:module";

const require2 = createRequire(import.meta.url);

const typeDefs = fs
  .readFileSync(require2.resolve("./schema.graphql"))
  .toString("utf-8");

const pubsub = new PubSub();

const resourceLoader = new ResourceLoader();

let displays: PhysicalDisplay[] | null = null;
let applicationMode = "desktop";
let currentVerse = `There is strength within the sorrow
There is beauty in our tears
And You meet us in our mourning
With a love that casts out fear`;

const resolvers = {
  Query: {
    songs: () => resourceLoader.getSongs(),
    song: (_parent: any, args: { id: string }, _ctx: any, _info: any) => {
      return resourceLoader.getSong(args.id);
    },
    currentSong: () => null,
    currentVerse: () => currentVerse,
    applicationMode: () => applicationMode,
    displays: () => displays,
  },
  Mutation: {
    setCurrentVerse: (_: any, data: { text: string }) => {
      currentVerse = data.text;

      pubsub.publish("CURRENT_VERSE_CHANGED", {
        currentVerseChanged: currentVerse,
      });

      return currentVerse;
    },
  },
  Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield { hello: word };
        }
      },
    },
    currentVerseChanged: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["CURRENT_VERSE_CHANGED"]),
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers });
