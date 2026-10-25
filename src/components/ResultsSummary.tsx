import type { YearRow } from "../utils/calculate";
import { formatNaira } from "../utils/format";

interface Props {
  rows: YearRow[];
  target: number;
}

export default function ResultsSummary({ rows, target }: Props) {
  const final = rows[rows.length - 1];
  if (!final) return <p className="verdict">Enter a duration of at least 1 year.</p>;

  const reachedIn = target > 0 ? rows.find((row) => row.balance >= target) : undefined;
  const yearWord = final.year === 1 ? "year" : "years";

  let headline: string;
  if (target <= 0) headline = "Set a goal amount to see when you'll hit it.";
  else if (reachedIn) headline = `You hit ${formatNaira(target)} in year ${reachedIn.year}.`;
  else headline = `You're ${formatNaira(target - final.balance)} short after ${final.year} ${yearWord}.`;

  return (
    <div>
      <p className={reachedIn ? "verdict hit" : "verdict"}>{headline}</p>
      <dl className="figures">
        <div>
          <dt>You put in</dt>
          <dd>{formatNaira(final.contributed)}</dd>
        </div>
        <div>
          <dt>Interest earned</dt>
          <dd>{formatNaira(final.interest)}</dd>
        </div>
        <div>
          <dt>Final balance</dt>
          <dd>{formatNaira(final.balance)}</dd>
        </div>
      </dl>
    </div>
  );
}