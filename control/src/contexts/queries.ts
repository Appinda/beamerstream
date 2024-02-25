import { gql } from "@apollo/client";

export const QUERY_INITIAL = gql`
  query Initial {
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
    currentSlide {
      id
    }
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

export const QUERY_SONG = gql`
  query Song($songId: ID!) {
    song(id: $songId) {
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

export const SUBSCRIBE_CURRENTSLIDE = gql`
  subscription CurrentSlide {
    currentSlide {
      id
      songId
      text
    }
  }
`;
export const MUTATE_CURRENTSLIDE = gql`
  mutation SetCurrentSlide($songId: ID!, $slideId: ID!) {
    setCurrentSlide(songId: $songId, slideId: $slideId)
  }
`;

export const SET_CURRENT_VERSE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SetCurrentVerse($text: String!) {
    setCurrentVerse(text: $text)
  }
`;

export const SUBSCRIBE_SONG = gql`
  subscription Subscription {
    currentVerseChanged
  }
`;
