import NextHead from "next/head";

type HeadProps = {
  title: string;
};

const Head: React.FC<HeadProps> = (props) => {
  const { title } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="description"
        content="A typing speed game to measure your WPM"
      />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
