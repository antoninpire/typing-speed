import Link from "next/link";
import Github from "~/components/icons/Github";
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
          <Github />
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
