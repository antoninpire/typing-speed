import { useCallback, useRef } from "react";
import Refresh from "~/components/icons/Refresh";
import { useEngineStore } from "~/stores/engine";

const RestartButton: React.FC = () => {
  const { reset } = useEngineStore((state) => state.actions);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRefresh = useCallback(() => {
    buttonRef.current?.blur();
    reset();
  }, [reset]);

  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      className={`mx-auto mt-3 block rounded px-8  py-2 text-text hover:bg-transparent/20`}
      onClick={handleRefresh}
    >
      <Refresh />
    </button>
  );
};

export default RestartButton;
