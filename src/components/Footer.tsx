import Link from "next/link";
import Separator from "~/components/ui/Separator";
import { useEngineStore } from "~/stores/engine";

type FooterProps = {
  links: {
    href: string;
    label: string;
  }[];
};

const Footer: React.FC<FooterProps> = (props) => {
  const { links } = props;
  const state = useEngineStore((state) => state.state);

  return (
    <footer
      className={`fixed left-0 bottom-0 flex w-screen items-center justify-center pb-5 ${
        state === "TYPING" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div className="flex w-[48rem] items-center justify-between">
        <a
          href="https://github.com/antoninpire/typing-speed"
          className="flex items-center gap-1 text-white hover:text-primary"
          target="_blank"
          rel="noreferrer"
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
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          source code
        </a>
        <div className="flex h-5 items-center gap-2">
          {links.map((link, index) => (
            <div key={`footer-link-${index}`}>
              <Link
                href={link.href}
                className="text-white hover:cursor-pointer hover:text-primary"
              >
                {link.label}
              </Link>
              {index !== links.length - 1 && (
                <Separator orientation="vertical" />
              )}
            </div>
          ))}
        </div>

        <a
          href="https://antonin.dev"
          className="text-white hover:text-primary"
          target="_blank"
          rel="noreferrer"
        >
          created by @antonin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
