import ResultsSummary from "./components/ResultsSummary";
import { useMemo, useState } from "react";
import InputForm, { type FormValues } from "./components/InputForm";
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
  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Savings Goal Calculator</h1>
      <InputForm values={values} onChange={handleChange} />
      <ResultsSummary rows={rows} target={Number(values.target) || 0} />
  );
}