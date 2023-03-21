import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Tooltip from "~/components/ui/Tooltip";
import { useFiltersProfile } from "~/stores/filters";
import { api } from "~/utils/api";

const Table: React.FC = () => {
  const { gameType, duration } = useFiltersProfile();

  const router = useRouter();
  const { id } = router.query;

  const { data } = api.test.getByUserId.useQuery(
    { userId: id?.toString() ?? "" },
    { enabled: router.isReady }
  );

  const filteredTests = useMemo(() => {
    return (data?.tests ?? []).filter((test) => {
      const matchesGameType = !gameType || test.type === gameType;
      const matchesDuration = !duration || test.duration === duration;

      return matchesGameType && matchesDuration;
    });
  }, [data?.tests, gameType, duration]);

  return (
    <>
      {filteredTests.length === 0 ? (
        <div className="flex h-[55vh] items-center justify-center text-4xl font-bold text-white">
          No record found
        </div>
      ) : (
        <div className="no-scrollbar overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="no-scrollbar h-[55vh] overflow-auto">
              <table className="min-w-full text-left font-light text-white">
                <thead className="border-b border-gray-600 font-medium">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4"
                    >
                      <Tooltip label="Words per Minute">
                        <p className="hover:cursor-pointer">WPM</p>
                      </Tooltip>
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 bg-background px-6 py-4"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map((test, index) => (
                    <tr
                      key={test.id}
                      className="border-b border-gray-700 text-white/90"
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
    </>
  );
};

export default Table;
