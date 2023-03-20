import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import LoginModal from "~/components/LoginModal";
import SignupModal from "~/components/SignupModal";
import { Button } from "~/components/ui/Button";
import Tooltip from "~/components/ui/Tooltip";
import { useEngineStore } from "~/stores/engine";
import {
  usePreferenceActions,
  usePreferenceDuration,
  usePreferenceGameType,
  type Duration,
  type GameType,
} from "~/stores/preference";

type HeaderProps =
  | {
      showPreferences: false;
      title: string;
    }
  | {
      showPreferences?: true;
      title: undefined;
    };
const durations: Duration[] = [15, 30, 45, 60];
const gameTypes: GameType[] = [
  "normal",
  "lowercase",
  "numbers",
  "alpha",
  "alphanumeric",
];
// const wordsCounts: WordsCount[] = [12, 24, 36];

const Header: React.FC<HeaderProps> = (props) => {
  const { showPreferences = true } = props;

  const { updateDuration, updateGameType } = usePreferenceActions();
  const duration = usePreferenceDuration();
  const gameType = usePreferenceGameType();
  const state = useEngineStore((state) => state.state);

  const router = useRouter();
  const { data: session, status } = useSession();
  // const wordsCount = usePreferenceWordsCount();

  const handleClickDuration = useCallback(
    (duration: Duration) => {
      updateDuration(duration);
    },
    [updateDuration]
  );

  const handleClickGameType = useCallback(
    (gameType: GameType) => {
      updateGameType(gameType);
    },
    [updateGameType]
  );

  const handleClickLogout = useCallback(() => {
    void signOut();
  }, []);

  const handleClickMyHistory = useCallback(() => {
    if (!!session?.user.id) void router.push(`/profile/${session.user.id}`);
  }, [router, session?.user.id]);

  // const handleClickWordsCount = useCallback(
  //   (wordsCount: WordsCount) => {
  //     updateWordsCount(wordsCount);
  //   },
  //   [updateWordsCount]
  // );

  //   const handleClickTheme = useCallback(
  //     (theme: Theme) => {
  //       changeTheme(theme);
  //     },
  //     [changeTheme]
  //   );

  return (
    <header
      className={`fixed top-0 left-0 z-10 flex w-screen items-center justify-center bg-background px-8 pt-5 ${
        state === "TYPING" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div className="flex w-[48rem] items-center justify-between gap-8">
        {/* <div className="flex items-center gap-2 font-semibold text-white">
        <p>theme: </p>
        {themes.map((t) => (
          <span
            key={`preference-theme-${t}`}
            className={`hover:cursor-pointer hover:text-primary ${
              theme === t ? "text-primary" : ""
            }`}
            onClick={() => handleClickTheme(t)}
          >
            {t}
          </span>
        ))}
      </div> */}

        {showPreferences === false ? (
          <div>
            <h3 className="text-4xl font-bold text-text">{props.title}</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-semibold text-white">
              <p>time: </p>
              {durations.map((d) => (
                <span
                  key={`preference-duration-${d}`}
                  className={`hover:cursor-pointer hover:text-primary ${
                    duration === d ? "text-primary" : ""
                  }`}
                  onClick={() => handleClickDuration(d)}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <p>type: </p>
              {gameTypes.map((gt) => (
                <span
                  key={`preference-game-type-${gt}`}
                  className={`hover:cursor-pointer hover:text-primary ${
                    gameType === gt ? "text-primary" : ""
                  }`}
                  onClick={() => handleClickGameType(gt)}
                >
                  {gt}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 font-semibold text-white">
          {status === "authenticated" ? (
            <>
              <Button onClick={handleClickMyHistory}>My Profile</Button>
              <Tooltip label="Logout">
                <Button variant="destructive" onClick={handleClickLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <LoginModal />
              <SignupModal />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
