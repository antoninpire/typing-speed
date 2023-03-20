import { useCallback, useRef } from "react";
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2v6h6"></path>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
        <path d="M21 22v-6h-6"></path>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
      </svg>
    </button>
  );
};

export default RestartButton;
