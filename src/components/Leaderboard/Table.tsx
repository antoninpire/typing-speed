import dayjs from "dayjs";
import Link from "next/link";
import Tooltip from "~/components/ui/Tooltip";
import { useFiltersLeaderboard } from "~/stores/filters";
import { api } from "~/utils/api";

const Table: React.FC = () => {
  const { time, gameType, duration } = useFiltersLeaderboard();

  const { data: tests = [] } = api.test.getAll.useQuery({
    time,
    gameType: gameType || undefined,
    duration,
  });

  return (
    <>
      {tests.length === 0 ? (
        <div className="flex h-[80vh] items-center justify-center text-4xl font-bold text-white">
          No record found
        </div>
      ) : (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="no-scrollbar h-[75vh] overflow-auto">
              <table className="min-w-full text-left font-light text-white">
                <thead className="border-b border-gray-600 font-medium">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
                      <Tooltip label="Words per Minute">
                        <p className="hover:cursor-pointer">WPM</p>
                      </Tooltip>
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4 "
                    >
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
                          <Tooltip
                            label={`Open ${test.user.username}'s profile`}
                          >
                            <Link
                              href={`/profile/${test.user.id}`}
                              className="text-blue-500 hover:cursor-pointer"
                            >
                              {test.user.username}
                            </Link>
                          </Tooltip>
                        )}
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
    </>
  );
};

export default Table;
