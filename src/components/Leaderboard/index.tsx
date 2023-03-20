import Filters from "~/components/Leaderboard/Filters";
import Table from "~/components/Leaderboard/Table";
import Loader from "~/components/Loader";
import { useFiltersLeaderboard } from "~/stores/filters";
import { api } from "~/utils/api";

const Leaderboard: React.FC = () => {
  const { time, gameType, duration } = useFiltersLeaderboard();

  const { isLoading } = api.test.getAll.useQuery({
    time,
    gameType: gameType || undefined,
    duration,
  });

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col">
      <Filters />
      <Table />
    </div>
  );
};

export default Leaderboard;
