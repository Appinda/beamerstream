import fs from "node:fs";
import { PhysicalDisplay } from "@beamerstream/library";
import { PubSub } from "graphql-subscriptions";
import ResourceLoader from "./resources/ResourceLoader.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createRequire } from "node:module";
import { GraphQLSchema } from "graphql";

export default class SchemaBuilder {
  private typeDefs: string;

  constructor(private readonly resources: ResourceLoader) {
    const require2 = createRequire(import.meta.url);
    this.typeDefs = fs.readFileSync(require2.resolve("./schema.graphql"), { encoding: "utf-8" });
  }

  build(): GraphQLSchema {
    const pubsub = new PubSub();
    let displays: PhysicalDisplay[] | null = null;
    let applicationMode = "desktop";
    let currentVerse = `There is strength within the sorrow
There is beauty in our tears
And You meet us in our mourning
With a love that casts out fear`;

    const resolvers = {
      Query: {
        songs: () => this.resources.getSongs(),
        song: (_parent: any, args: { id: string }, _ctx: any, _info: any) => {
          return this.resources.getSong(args.id);
        },
        currentSong: () => null,
        currentVerse: () => currentVerse,
        applicationMode: () => applicationMode,
        displays: () => displays
      },
      Mutation: {
        setCurrentVerse: (_: any, data: { text: string }) => {
          currentVerse = data.text;

          pubsub.publish("CURRENT_VERSE_CHANGED", {
            currentVerseChanged: currentVerse
          });

          return currentVerse;
        }
      },
      Subscription: {
        hello: {
          // Example using an async generator
          subscribe: async function* () {
            for await (const word of ["Hello", "Bonjour", "Ciao"]) {
              yield { hello: word };
            }
          }
        },
        currentVerseChanged: {
          // More on pubsub below
          subscribe: () => pubsub.asyncIterator(["CURRENT_VERSE_CHANGED"])
        }
      }
    };

    return makeExecutableSchema({ typeDefs: this.typeDefs, resolvers });
  }
}
