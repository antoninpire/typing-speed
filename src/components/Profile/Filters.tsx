import { useCallback } from "react";
import { durationOptions, type Duration } from "~/common/durations";
import { gameTypeOptions, type GameType } from "~/common/game-types";
import Select from "~/components/ui/Select";
import { useFiltersActions, useFiltersProfile } from "~/stores/filters";

const Filters: React.FC = () => {
  const { gameType, duration } = useFiltersProfile();
  const { updateProfileFilters } = useFiltersActions();

  const handleChangeGameType = useCallback(
    (gameType: GameType) => {
      updateProfileFilters("gameType", gameType);
    },
    [updateProfileFilters]
  );

  const handleChangeDuration = useCallback(
    (duration: Duration) => {
      updateProfileFilters(
        "duration",
        !duration ? undefined : (parseInt(duration.toString()) as Duration)
      );
    },
    [updateProfileFilters]
  );

  return (
    <div className="mt-8 flex w-[48rem] items-center justify-between px-2">
      <div className="text-5xl font-bold text-white">history</div>
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
