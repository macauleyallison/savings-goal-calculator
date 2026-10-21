import { projectGrowth } from "./utils/calculate";

console.log(
  projectGrowth({ initialAmount: 100000, monthlyContribution: 50000, annualRate: 0, years: 5 })
);

export default function App() {
  return (
    <main>
      <h1>Savings Goal Calculator</h1>
    </main>
  );
}