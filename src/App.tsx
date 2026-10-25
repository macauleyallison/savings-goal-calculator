import { useEffect, useMemo, useState } from "react";
import GrowthChart from "./components/GrowthChart";
import InputForm, { type FormValues } from "./components/InputForm";
import ResultsSummary from "./components/ResultsSummary";
import { projectGrowth } from "./utils/calculate";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage unavailable, fall back to the device setting
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [values, setValues] = useState<FormValues>({
    target: "5000000",
    initialAmount: "100000",
    monthlyContribution: "50000",
    annualRate: "12",
    years: "5",
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore, the choice just won't be remembered
    }
  }, [theme]);

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
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </button>
        <h1>Savings goal calculator</h1>
        <p className="lede">Put in your numbers and see when you hit your goal.</p>
        <InputForm values={values} onChange={handleChange} />
      </aside>
      <section className="results">
        <ResultsSummary rows={rows} target={target} />
        <GrowthChart rows={rows} target={target} />
      </section>
    </main>
  );
}