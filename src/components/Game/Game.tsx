import { useCallback, useEffect, useRef } from "react";
import Footer from "~/components/Footer";
import Commands from "~/components/Game/Commands";
import Countdown from "~/components/Game/Countdown";
import Cursor from "~/components/Game/Cursor";
import Results from "~/components/Game/Results";
import Header from "~/components/Header";
import { useEngineStore } from "~/stores/engine";

const Game: React.FC = () => {
  const words = useEngineStore((state) => state.words);
  const currentWord = useEngineStore((state) => state.currentWord);
  const inputs = useEngineStore((state) => state.inputs);
  const input = useEngineStore((state) => state.input);
  const state = useEngineStore((state) => state.state);
  // const currentWordRef = useEngineStore((state) => state.currentWordRef);
  const { pressKey, updateCurrentWordRef } = useEngineStore(
    (state) => state.actions
  );
  const extraCharacters = input.slice(currentWord.length).split("");
  const currentWordRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // if a modal is open, then prevent pressing a key on the game
      const modal = document.getElementById("modal");
      if (modal && modal.dataset.state === "open") return;

      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Tab") {
        pressKey(e.key);
        e.preventDefault();
      }
    },
    [pressKey]
  );

  useEffect(() => {
    updateCurrentWordRef(currentWordRef);
  }, [updateCurrentWordRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const index = input.length - 1;
    const currentWordElement = currentWordRef?.current;
    currentWordElement?.children[index + 1]?.classList.add(
      currentWord[index] !== input[index] ? "wrong" : "right"
    );
  }, [currentWord, input, currentWordRef]);

  useEffect(() => {
    const index = input.length;
    const currentWordElement = currentWordRef?.current;
    if (index < currentWord.length)
      currentWordElement?.children[index + 1]?.classList.remove(
        "wrong",
        "right"
      );
  }, [currentWord.length, currentWordRef, input.length]);

  return (
    <div className="max-w-4xl">
      <Header title={undefined} />
      {(state === "WAITING" || state === "TYPING") && (
        <div>
          <Countdown />
          <div className="flex h-[112px] select-none flex-wrap items-center overflow-hidden text-3xl font-extrabold text-text">
            {words.map((word, wordIndex) => {
              const isActualWord =
                currentWord === word && inputs.length === wordIndex;
              const splittedWord = word.split("");
              return (
                <div
                  key={`word-${wordIndex}`}
                  className="word relative mx-[5px] mb-[2px]"
                  ref={isActualWord ? currentWordRef : null}
                >
                  {isActualWord && <Cursor left={input.length * 15} />}
                  {splittedWord.map((character, characterIndex) => {
                    return (
                      <span
                        key={`character-${characterIndex}`}
                        className="test"
                      >
                        {character}
                      </span>
                    );
                  })}
                  {isActualWord
                    ? extraCharacters.map((character, characterIndex) => {
                        return (
                          <span
                            key={`extra-character-${characterIndex}`}
                            className="wrong extra"
                          >
                            {character}
                          </span>
                        );
                      })
                    : inputs[wordIndex]
                    ? inputs[wordIndex]
                        ?.slice(words[wordIndex]?.length ?? 0)
                        .split("")
                        .map((character, characterIndex) => {
                          return (
                            <span
                              key={`extra-character-${characterIndex}`}
                              className="wrong extra"
                            >
                              {character}
                            </span>
                          );
                        })
                    : null}
                </div>
              );
            })}
          </div>
          <Commands />
        </div>
      )}
      {state === "RESULT" && <Results />}
      <Footer links={[{ href: "/leaderboard", label: "leaderboard" }]} />
    </div>
  );
};

export default Game;
