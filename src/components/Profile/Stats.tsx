import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Stats: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.test.getByUserId.useQuery(
    { userId: id?.toString() ?? "" },
    { enabled: router.isReady }
  );

  return (
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
        <span className="text-lg font-semibold text-primary">Total Tests</span>
        <h2 className="text-6xl font-extrabold text-white">
          {data?.tests.length ?? 0}
        </h2>
        <span className="mt-2 text-sm text-gray-400">
          more than {data?.betterThanTotal ?? 0}% of people
        </span>
      </div>
    </div>
  );
};

export default Stats;
