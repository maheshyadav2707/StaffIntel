interface Props {
  title: string;
  value: number;
}

export default function MetricCard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-slate-800 p-4 text-center">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}