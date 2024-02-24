import { gql } from "@apollo/client";

export const GET_SONGLIST = gql`
  query Songs {
    songs {
      id
      created
      modified
      titles
      authors
      copyright
      ccli
      comments
      verseOrder
      lyrics {
        tag
        text
      }
    }
  }
`;

export const SET_CURRENT_VERSE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SetCurrentVerse($text: String!) {
    setCurrentVerse(text: $text)
  }
`;

export const GET_SONG = gql`
  query Song {
    currentSong {
      name
    }
    currentVerse
    songs {
      name
    }
  }
`;

export const SUBSCRIBE_SONG = gql`
  subscription Subscription {
    currentVerseChanged
  }
`;

export const GET_THEMES = gql`
  query Themes {
    themes {
      id
      created
      modified
      name
      slides {
        id
        name
        layers {
          id
          text
          color
          src
        }
      }
    }
  }
`;
