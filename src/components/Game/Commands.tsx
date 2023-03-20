const Commands: React.FC = () => {
  return (
    <div className="absolute bottom-[12%] left-0 flex w-screen items-center justify-center">
      <div className="flex items-center gap-2 text-white">
        <kbd className="rounded bg-text px-3 py-1 text-sm font-semibold text-black">
          Tab
        </kbd>
        to restart the test
      </div>
    </div>
  );
};

export default Commands;
