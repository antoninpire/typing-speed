import { useCallback } from "react";
import { durationOptions, type Duration } from "~/common/durations";
import { gameTypeOptions, type GameType } from "~/common/game-types";
import type { TimeFilter } from "~/common/time-filters";
import Select from "~/components/ui/Select";
import Separator from "~/components/ui/Separator";
import { useFiltersActions, useFiltersLeaderboard } from "~/stores/filters";

const Filters: React.FC = () => {
  const { time, gameType, duration } = useFiltersLeaderboard();
  const { updateLeaderboardFilters } = useFiltersActions();

  const handleChangeTime = useCallback(
    (time: TimeFilter) => {
      updateLeaderboardFilters("time", time);
    },
    [updateLeaderboardFilters]
  );

  const handleChangeGameType = useCallback(
    (gameType: GameType) => {
      updateLeaderboardFilters("gameType", gameType);
    },
    [updateLeaderboardFilters]
  );

  const handleChangeDuration = useCallback(
    (duration: Duration) => {
      updateLeaderboardFilters(
        "duration",
        !duration ? undefined : (parseInt(duration.toString()) as Duration)
      );
    },
    [updateLeaderboardFilters]
  );

  return (
    <div className="flex w-[48rem] items-center justify-between px-2">
      <div className="flex h-6 items-center space-x-3">
        <p
          className={`hover:cursor-pointer ${
            time === "ALL_TIME" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeTime("ALL_TIME")}
        >
          All Time
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            time === "THIS_YEAR" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeTime("THIS_YEAR")}
        >
          This Year
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            time === "THIS_MONTH" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeTime("THIS_MONTH")}
        >
          This Month
        </p>
        <Separator orientation="vertical" />
        <p
          className={`hover:cursor-pointer ${
            time === "TODAY" ? "text-primary" : "text-white"
          } hover:text-primary`}
          onClick={() => handleChangeTime("TODAY")}
        >
          Today
        </p>
      </div>
      <div className="flex w-[40%] items-center gap-2">
        <Select
          placeholder="All Durations"
          options={durationOptions}
          value={duration?.toString() ?? ""}
          onChange={handleChangeDuration}
        />
        <Select
          placeholder="All Types"
          options={gameTypeOptions}
          value={gameType}
          onChange={handleChangeGameType}
        />
      </div>
    </div>
  );
};

export default Filters;
