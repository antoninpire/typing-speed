type CursorProps = {
  left: number;
};

const Cursor: React.FC<CursorProps> = (props) => {
  const { left } = props;

  return (
    <span
      className="blink absolute bottom-0.5 -ml-[7.29165px] font-bold !text-primary"
      style={{ left }}
    >
      |
    </span>
  );
};

export default Cursor;
