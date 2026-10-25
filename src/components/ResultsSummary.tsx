import type { YearRow } from "../utils/calculate";
import { formatNaira } from "../utils/format";

interface Props {
  rows: YearRow[];
  target: number;
}

export default function ResultsSummary({ rows, target }: Props) {
  const final = rows[rows.length - 1];
  if (!final) return <p>Enter a duration of at least 1 year.</p>;

  const reachedIn = rows.find((row) => row.balance >= target);

  return (
    <section>
      <p>Total contributed: {formatNaira(final.contributed)}</p>
      <p>Interest earned: {formatNaira(final.interest)}</p>
      <p>Final balance: {formatNaira(final.balance)}</p>
      <p>
        {target <= 0
          ? "Set a savings target to see when you'll reach it."
          : reachedIn
            ? `You reach your target in year ${reachedIn.year}.`
            : `You fall short of your target by ${formatNaira(target - final.balance)}.`}
      </p>
    </section>
  );
}