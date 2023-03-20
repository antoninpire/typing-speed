import { useRouter } from "next/router";
import Loader from "~/components/Loader";
import Filters from "~/components/Profile/Filters";
import Stats from "~/components/Profile/Stats";
import Table from "~/components/Profile/Table";
import { api } from "~/utils/api";

const Profile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading } = api.test.getByUserId.useQuery(
    { userId: id?.toString() ?? "" },
    { enabled: router.isReady }
  );

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col">
      <Stats />
      <div className="flex flex-col">
        <Filters />
        <Table />
      </div>
    </div>
  );
};

export default Profile;
