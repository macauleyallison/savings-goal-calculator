import { useMemo, useState } from "react";
import GrowthChart from "./components/GrowthChart";
import InputForm, { type FormValues } from "./components/InputForm";
import ResultsSummary from "./components/ResultsSummary";
import { projectGrowth } from "./utils/calculate";

export default function App() {
  const [values, setValues] = useState<FormValues>({
    target: "5000000",
    initialAmount: "100000",
    monthlyContribution: "50000",
    annualRate: "12",
    years: "5",
  });

  const handleChange = (field: keyof FormValues, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const rows = useMemo(
    () =>
      projectGrowth({
        initialAmount: Number(values.initialAmount) || 0,
        monthlyContribution: Number(values.monthlyContribution) || 0,
        annualRate: Number(values.annualRate) || 0,
        years: Math.max(0, Math.floor(Number(values.years) || 0)),
      }),
    [values]
  );

  const target = Number(values.target) || 0;

  return (
    <main className="layout">
      <aside className="panel">
        <h1>Savings goal calculator</h1>
        <p className="lede">See how long it takes to reach your target.</p>
        <InputForm values={values} onChange={handleChange} />
      </aside>
      <section className="results">
        <ResultsSummary rows={rows} target={target} />
        <GrowthChart rows={rows} target={target} />
      </section>
    </main>
  );
}