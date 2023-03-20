import { useMemo } from "react";
import { useEngineStore } from "~/stores/engine";
import { usePreferenceDuration } from "~/stores/preference";

export const useResults = () => {
  const duration = usePreferenceDuration();
  const words = useEngineStore((state) => state.words);
  const inputs = useEngineStore((state) => state.inputs);
  const currentWord = useEngineStore((state) => state.currentWord);
  const [
    amountOfCorrectCharacters,
    amountOfCorrectWords,
    amountOfIncorrectWords,
    wpm,
  ] = useMemo(() => {
    let amountOfCorrectCharacters = 0,
      amountOfCorrectWords = 0,
      amountOfIncorrectWords = 0;
    inputs.forEach((word, index) => {
      if (word === words[index]) {
        amountOfCorrectWords++;
        amountOfCorrectCharacters += word.length;
      } else amountOfIncorrectWords++;
    });

    const wpm = Math.round(
      ((amountOfCorrectCharacters + words.indexOf(currentWord)) * 60) /
        duration /
        5
    );

    return [
      amountOfCorrectCharacters,
      amountOfCorrectWords,
      amountOfIncorrectWords,
      wpm,
    ];
  }, [words, inputs, currentWord, duration]);

  return {
    amountOfCorrectCharacters,
    amountOfCorrectWords,
    amountOfIncorrectWords,
    wpm,
    duration,
  };
};
