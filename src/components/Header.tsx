import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { durations, type Duration } from "~/common/durations";
import { gameTypes, type GameType } from "~/common/game-types";
import { themes, type Theme } from "~/common/themes";
import LoginModal from "~/components/LoginModal";
import SignupModal from "~/components/SignupModal";
import Palette from "~/components/icons/Palette";
import { Button } from "~/components/ui/Button";
import Sheet from "~/components/ui/Sheet";
import Tooltip from "~/components/ui/Tooltip";
import { useEngineStore } from "~/stores/engine";
import {
  usePreferenceActions,
  usePreferenceDuration,
  usePreferenceGameType,
  usePreferenceTheme,
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

const Header: React.FC<HeaderProps> = (props) => {
  const { showPreferences = true } = props;

  const { updateDuration, updateGameType, updateTheme } =
    usePreferenceActions();
  const duration = usePreferenceDuration();
  const gameType = usePreferenceGameType();
  const currentTheme = usePreferenceTheme();
  const state = useEngineStore((state) => state.state);

  const router = useRouter();
  const { data: session, status } = useSession();

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

  const handleClickTheme = useCallback(
    (theme: Theme) => {
      updateTheme(theme);
    },
    [updateTheme]
  );

  const handleClickLogout = useCallback(() => {
    void signOut();
  }, []);

  const handleClickMyHistory = useCallback(() => {
    if (!!session?.user.id) void router.push(`/profile/${session.user.id}`);
  }, [router, session?.user.id]);

  return (
    <header
      className={`fixed top-0 left-0 z-10 flex w-screen items-center justify-center bg-background px-8 pt-5 ${
        state === "TYPING" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div className="flex w-[48rem] items-center justify-between gap-8">
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
            <div className="grid grid-flow-col font-semibold text-white">
              <p>type: </p>
              <div className="flex flex-wrap items-center gap-2 pl-2">
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
          </div>
        )}
        <div className="flex min-w-[12rem] items-center gap-2 font-semibold text-white">
          {status === "authenticated" ? (
            <>
              <Tooltip label="Go to your Profile">
                <Button onClick={handleClickMyHistory}>Profile</Button>
              </Tooltip>
              <Tooltip label="Change Theme">
                <div>
                  <Sheet
                    openerButtonProps={{
                      className: "!px-2.5",
                      variant: "outline",
                      children: <Palette />,
                    }}
                    title="Change Theme"
                    position="right"
                    size="xs"
                  >
                    <div className="no-scrollbar flex flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll px-3 py-12">
                      {Object.entries(themes).map(([name, theme]) => (
                        <div
                          key={`theme-${name}`}
                          className={`flex w-52 items-center gap-6 rounded px-3 py-2 hover:cursor-pointer ${
                            name === currentTheme
                              ? "bg-transparent/20"
                              : "hover:bg-transparent/10"
                          }`}
                          onClick={() => handleClickTheme(name as Theme)}
                        >
                          <div
                            className="h-10 w-10 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div className="text-xl text-text">{name}</div>
                        </div>
                      ))}
                    </div>
                  </Sheet>
                </div>
              </Tooltip>
              <Tooltip label="Logout">
                <Button
                  variant="destructive"
                  onClick={handleClickLogout}
                  className="!px-2.5"
                >
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
