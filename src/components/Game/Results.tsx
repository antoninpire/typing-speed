import RestartButton from "~/components/Game/RestartButton";
import { useResults } from "~/hooks/use-results";

const Results: React.FC = () => {
  const { amountOfCorrectWords, amountOfIncorrectWords, wpm } = useResults();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-5xl font-extrabold text-primary">{wpm} wpm</div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-xl font-semibold text-text">
          Correct words: {amountOfCorrectWords}
        </p>
        <p className="text-center text-xl font-semibold text-red-500">
          Incorrect words: {amountOfIncorrectWords}
        </p>
      </div>
      <div>
        <RestartButton />
      </div>
    </div>
  );
};

export default Results;
