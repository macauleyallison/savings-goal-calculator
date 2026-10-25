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
    <div style={{ width: "100%", height: 320, marginTop: 24 }}>
      <ResponsiveContainer>
        <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottom", offset: -4 }}
          />
          <YAxis tickFormatter={(v) => `₦${(Number(v) / 1_000_000).toFixed(1)}M`} width={70} />
          <Tooltip formatter={(value) => formatNaira(Number(value))} labelFormatter={(y) => `Year ${y}`} />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="balance" name="Balance" stroke="#00A3E0" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="contributed" name="Contributed" stroke="#888888" strokeWidth={2} dot={false} />
          {target > 0 && (
            <ReferenceLine y={target} stroke="#d9534f" strokeDasharray="6 4" label="Target" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}