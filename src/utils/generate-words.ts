import {
  randAlpha,
  randAlphaNumeric,
  randAnimalType,
  randColor,
  randDrinks,
  randMovie,
  randMusicGenre,
  randNumber,
  randProgrammingLanguage,
  randWord,
} from "@ngneat/falso";
import type { GameType } from "~/common/game-types";

const WORDS_COUNT = 200;

export const generateWords = (gameType?: GameType) => {
  const generateRandomInRange = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  if (gameType === "normal")
    return randWord({
      length: WORDS_COUNT,
      charCount: generateRandomInRange(4, 12),
      capitalize: true,
    });
  else if (gameType === "alphanumeric")
    return Array(WORDS_COUNT)
      .fill("")
      .map(() =>
        Array<string>(generateRandomInRange(4, 12))
          .fill("")
          .reduce(
            (prev) =>
              prev +
              randAlphaNumeric({
                length: 1,
              }).toString(),
            ""
          )
      );
  else if (gameType === "alpha")
    return Array(WORDS_COUNT)
      .fill("")
      .map(() =>
        Array<string>(generateRandomInRange(4, 12))
          .fill("")
          .reduce(
            (prev) =>
              prev +
              randAlpha({
                length: 1,
              }).toString(),
            ""
          )
      );
  else if (gameType === "numbers")
    return randNumber({
      charCount: generateRandomInRange(4, 12),
      length: WORDS_COUNT,
    }).map((el) => el.toString());
  else if (gameType === "color")
    return randColor({
      length: WORDS_COUNT,
    }).map((color) => color.split(" ").join("-"));
  else if (gameType === "drink")
    return randDrinks({
      length: WORDS_COUNT,
    }).map((drink) => drink.split(" ").join("-"));
  else if (gameType === "programming")
    return randProgrammingLanguage({
      length: WORDS_COUNT,
    }).map((language) => language.split(" ").join("-"));
  else if (gameType === "movie")
    return randMovie({
      length: WORDS_COUNT,
    }).map((movie) => movie.split(" ").join("-"));
  else if (gameType === "music-genre")
    return randMusicGenre({
      length: WORDS_COUNT,
    }).map((mg) => mg.split(" ").join("-"));
  else if (gameType === "animal")
    return randAnimalType({
      length: WORDS_COUNT,
    }).map((at) => at.split(" ").join("-"));

  return randWord({
    length: WORDS_COUNT,
    charCount: generateRandomInRange(4, 12),
    capitalize: false,
  });
};
