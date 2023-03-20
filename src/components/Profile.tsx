import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import Loader from "~/components/Loader";
import Select from "~/components/ui/Select";
import Tooltip from "~/components/ui/Tooltip";
import type { GameType } from "~/stores/preference";
import { api } from "~/utils/api";

type ProfileFiltersProps = {
  gameType?: GameType;
  handleChangeGameType: (gameType: GameType) => void;
};

const ProfileFilters: React.FC<ProfileFiltersProps> = (props) => {
  const { gameType, handleChangeGameType } = props;

  return (
    <div className="mt-8 flex w-[48rem] items-center justify-between px-2">
      <div className="text-5xl font-bold text-white">history</div>
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

const Profile: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>();

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = api.test.getByUserId.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { userId: id?.toString() ?? "" },
    { enabled: router.isReady }
  );

  const handleChangeGameType = useCallback((gameType: GameType) => {
    setGameType(gameType);
  }, []);

  const filteredTests = useMemo(() => {
    return (data?.tests ?? []).filter((test) => {
      const matchesGameType = !gameType || test.type === gameType;

      return matchesGameType;
    });
  }, [data?.tests, gameType]);

  // const [meanWpm, maxWpm, totalTests] = useMemo(() => {
  //   const tests = data?.tests ?? [];

  //   return [
  //     tests.length === 0
  //       ? 0
  //       : Math.round(
  //           tests.reduce((total, test) => total + test.wpm, 0) / tests.length
  //         ),
  //     tests.length === 0 ? 0 : Math.max(...tests.map((test) => test.wpm)),
  //     tests.length,
  //   ];
  // }, [data?.tests]);

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap overflow-hidden rounded-xl bg-gray-400/5 py-4">
        <div className="flex w-[32%] flex-col items-center">
          <span className="text-lg font-semibold text-primary">Mean WPM</span>
          <h2 className="text-6xl font-extrabold text-white">
            {data?.meanWpm ?? 0}
          </h2>
          <span className="mt-2 text-sm text-gray-400">
            better than {data?.betterThanMean ?? 0}% of people
          </span>
        </div>
        <div className="h-24 w-px self-center bg-gray-700" />
        <div className="flex w-1/3 flex-col items-center">
          <span className="text-lg font-semibold text-primary">Max WPM</span>
          <h2 className="text-6xl font-extrabold text-white">
            {data?.maxWpm ?? 0}
          </h2>
          <span className="mt-2 text-sm text-gray-400">
            better than {data?.betterThanMax ?? 0}% of people
          </span>
        </div>
        <div className="h-24 w-px self-center bg-gray-700" />
        <div className="flex w-1/3 flex-col items-center">
          <span className="text-lg font-semibold text-primary">
            Total Tests
          </span>
          <h2 className="text-6xl font-extrabold text-white">
            {data?.tests.length ?? 0}
          </h2>
          <span className="mt-2 text-sm text-gray-400">
            more than {data?.betterThanTotal ?? 0}% of people
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <ProfileFilters
          handleChangeGameType={handleChangeGameType}
          gameType={gameType}
        />
        {filteredTests.length === 0 ? (
          <div className="flex h-[55vh] items-center justify-center text-4xl font-bold text-white">
            No record found
          </div>
        ) : (
          <div className="no-scrollbar overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left font-light text-white">
                  <thead className="border-b border-gray-500 font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
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
                    {filteredTests.map((test, index) => (
                      <tr
                        key={test.id}
                        className="border-b border-gray-700 text-gray-300"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {test.wpm}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {test.duration}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {test.type}
                        </td>
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
        )}
      </div>
    </div>
  );
};

export default Profile;
