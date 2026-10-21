export interface Inputs {
  initialAmount: number;
  monthlyContribution: number;
  annualRate: number; // percent, e.g. 12 means 12%
  years: number;
}

export interface YearRow {
  year: number;
  contributed: number;
  balance: number;
  interest: number;
}

export function projectGrowth({
  initialAmount,
  monthlyContribution,
  annualRate,
  years,
}: Inputs): YearRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const rows: YearRow[] = [];
  let balance = initialAmount;
  let contributed = initialAmount;

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    contributed += monthlyContribution;

    if (month % 12 === 0) {
      rows.push({
        year: month / 12,
        contributed,
        balance,
        interest: balance - contributed,
      });
    }
  }
  return rows;
}