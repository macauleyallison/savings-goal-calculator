import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearRow } from "../utils/calculate";
import { formatNaira } from "../utils/format";

interface Props {
  rows: YearRow[];
  target: number;
}

export default function GrowthChart({ rows, target }: Props) {
  if (rows.length === 0) return null;

  return (
    <div className="chart">
      <ResponsiveContainer>
        <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottom", offset: -4 }}
          />
          <YAxis
            domain={[0, (dataMax: number) => Math.max(dataMax, target)]}
            tickFormatter={(v) => `₦${(Number(v) / 1_000_000).toFixed(1)}M`}
            width={70}
          />
          <Tooltip
            contentStyle={{
              background: "var(--tooltip-bg)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              color: "var(--ink)",
            }}
            labelStyle={{ color: "var(--ink)" }}
            formatter={(value) => formatNaira(Number(value))}
            labelFormatter={(y) => `Year ${y}`}
          />
          <Legend
            verticalAlign="top"
            formatter={(value) => <span style={{ color: "var(--muted)" }}>{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="balance"
            name="Balance"
            stroke="var(--balance)"
            strokeWidth={3}
            dot={rows.length < 3}
          />
          <Line
            type="monotone"
            dataKey="contributed"
            name="You put in"
            stroke="var(--contrib)"
            strokeWidth={2}
            dot={rows.length < 3}
          />
          {target > 0 && (
            <ReferenceLine
              y={target}
              stroke="var(--target)"
              strokeDasharray="6 4"
              label={{ value: "Goal", fill: "var(--target)", position: "insideTopRight" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}