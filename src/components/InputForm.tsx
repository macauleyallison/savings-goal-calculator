export interface FormValues {
  target: string;
  initialAmount: string;
  monthlyContribution: string;
  annualRate: string;
  years: string;
}

interface Props {
  values: FormValues;
  onChange: (field: keyof FormValues, value: string) => void;
}

const fields: { name: keyof FormValues; label: string }[] = [
  { name: "target", label: "Savings target (₦)" },
  { name: "initialAmount", label: "Starting amount (₦)" },
  { name: "monthlyContribution", label: "Monthly contribution (₦)" },
  { name: "annualRate", label: "Annual return (%)" },
  { name: "years", label: "Duration (years)" },
];

export default function InputForm({ values, onChange }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map(({ name, label }) => (
        <label key={name} className="field">
          <span>{label}</span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={values[name]}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </label>
      ))}
    </form>
  );
}