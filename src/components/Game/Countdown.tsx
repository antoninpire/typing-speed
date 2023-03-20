import { useEffect } from "react";
import { useResults } from "~/hooks/use-results";
import {
  useCountdownActions,
  useCountdownRef,
  useCountdownTime,
} from "~/stores/countdown";
import { useEngineStore } from "~/stores/engine";
import { usePreferenceGameType } from "~/stores/preference";
import { api } from "~/utils/api";

const Countdown: React.FC = () => {
  const time = useCountdownTime();
  const ref = useCountdownRef();
  const { clear } = useCountdownActions();
  const { updateState } = useEngineStore((state) => state.actions);
  const type = usePreferenceGameType();
  const {
    amountOfCorrectWords,
    amountOfIncorrectWords,
    wpm,
    amountOfCorrectCharacters,
    duration,
  } = useResults();

  const { mutate: createTest } = api.test.create.useMutation();

  useEffect(() => {
    if (!time && !!ref) {
      clear();
      updateState("RESULT");
      createTest({
        amountOfCorrectWords,
        amountOfIncorrectWords,
        amountOfCorrectCharacters,
        wpm,
        duration,
        type,
      });
    }
  }, [
    ref,
    time,
    updateState,
    clear,
    createTest,
    duration,
    wpm,
    amountOfCorrectCharacters,
    amountOfIncorrectWords,
    amountOfCorrectWords,
    type,
  ]);

  return <h1 className="text-xl font-bold text-primary">Time: {time}</h1>;
};

export default Countdown;
