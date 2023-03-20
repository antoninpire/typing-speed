import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useState } from "react";
import Loader from "~/components/Loader";
import Select from "~/components/ui/Select";
import Separator from "~/components/ui/Separator";
import Tooltip from "~/components/ui/Tooltip";
import type { GameType } from "~/stores/preference";
import { api } from "~/utils/api";

type Filter = "ALL_TIME" | "THIS_YEAR" | "THIS_MONTH" | "TODAY";

type LeaderboardFiltersProps = {
  filter: Filter;
  gameType?: GameType;
  handleChangeFilter: (filter: Filter) => void;
  handleChangeGameType: (gameType: GameType) => void;
};

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = (props) => {
  const { filter, handleChangeFilter, gameType, handleChangeGameType } = props;

  return (
    <div className="flex w-[48rem] items-center justify-between px-2">
      <div className="flex h-6 items-center space-x-3">
        <p
          className={`hover:cursor-pointer ${
            filter === "ALL_TIME" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeFilter("ALL_TIME")}
        >
          All Time
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            filter === "THIS_YEAR" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeFilter("THIS_YEAR")}
        >
          This Year
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            filter === "THIS_MONTH" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeFilter("THIS_MONTH")}
        >
          This Month
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            filter === "TODAY" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeFilter("TODAY")}
        >
          Today
        </p>
      </div>
      <div>
        <Select
          placeholder="All Types"
          options={[
            { label: "All Types", value: undefined },
            { label: "Lowercase", value: "lowercase" },
            { label: "Normal", value: "normal" },
            { label: "Numbers", value: "numbers" },
            { label: "Alpha", value: "alpha" },
            { label: "Alphanumeric", value: "alphanumeric" },
          ]}
          value={gameType}
          onChange={handleChangeGameType}
        />
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("ALL_TIME");
  const [gameType, setGameType] = useState<GameType>();

  const { data: tests = [], isLoading } = api.test.getAll.useQuery({
    filter,
    gameType: gameType || undefined,
  });

  const handleChangeFilter = useCallback((filter: Filter) => {
    setFilter(filter);
  }, []);

  const handleChangeGameType = useCallback((gameType: GameType) => {
    setGameType(gameType);
  }, []);

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <Loader />
      </div>
    );

  if (tests.length === 0)
    return (
      <div className="h-[80vh]">
        <LeaderboardFilters
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          handleChangeGameType={handleChangeGameType}
          gameType={gameType}
        />
        <div className="flex h-full items-center justify-center text-4xl font-bold text-white">
          No record found
        </div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <LeaderboardFilters
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        handleChangeGameType={handleChangeGameType}
        gameType={gameType}
      />
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left font-light text-white">
              <thead className="border-b border-gray-500 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <Tooltip label="Words per Minute">
                      <p className="hover:cursor-pointer">WPM</p>
                    </Tooltip>
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, index) => (
                  <tr
                    key={test.id}
                    className="border-b border-gray-700 text-gray-300"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {!test.user?.username ? (
                        "Unknown"
                      ) : (
                        <Tooltip label={`Open ${test.user.username}'s profile`}>
                          <Link
                            href={`/profile/${test.user.id}`}
                            className="text-blue-500 hover:cursor-pointer"
                          >
                            {test.user.username}
                          </Link>
                        </Tooltip>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{test.wpm}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {test.duration}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{test.type}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {dayjs(test.createdAt).format("YYYY-MM-DD HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
