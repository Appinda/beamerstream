import fs from "node:fs";
import { PhysicalDisplay, Theme } from "@beamerstream/library";
import { PubSub } from "graphql-subscriptions";
import ResourceLoader from "./resources/ResourceLoader.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createRequire } from "node:module";
import { GraphQLSchema } from "graphql";

let displays: PhysicalDisplay[] | null = null;
let applicationMode = "desktop";
let themes: Theme[] = [
  {
    id: "2",
    created: Date.now(),
    modified: Date.now(),
    name: "First theme",
    slides: [
      {
        id: "1",
        name: "Slide 1",
        layers: [
          {
            id: "2",
            type: "image",
            src: "/backgrounds/background1.jpg"
          },
          {
            id: "4",
            type: "text",
            text: "Hello"
          }
        ]
      },
      {
        id: "2",
        name: "Slide 2",
        layers: [
          {
            id: "6",
            type: "text",
            text: "World"
          }
        ]
      },
      {
        id: "3",
        name: "Slide 3",
        layers: [
          {
            id: "6",
            type: "text",
            text: "World"
          }
        ]
      }
    ]
  }
];

export default class SchemaBuilder {
  private typeDefs: string;

  constructor(private readonly resources: ResourceLoader) {
    const require2 = createRequire(import.meta.url);
    this.typeDefs = fs.readFileSync(require2.resolve("./schema.graphql"), { encoding: "utf-8" });
  }

  build(): GraphQLSchema {
    const pubsub = new PubSub();

    const resolvers = {
      Query: {
        songs: () => this.resources.getSongs(),
        song: (_parent: any, args: { id: string }, _ctx: any, _info: any) => {
          return this.resources.getSong(args.id);
        },
        currentSong: () => null,
        currentVerse: () => null,
        themes: () => themes,
        currentTheme: () => null,
        applicationMode: () => applicationMode,
        displays: () => displays
      },
      Mutation: {
        setCurrentVerse: (_: any, data: { text: string }) => {
          // currentVerse = data.text;
          // pubsub.publish("CURRENT_VERSE_CHANGED", {
          //   currentVerseChanged: currentVerse
          // });
          // return currentVerse;
          throw new Error("Not implemented");
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
