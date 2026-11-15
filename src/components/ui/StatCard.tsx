export interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-card bg-sand p-3 sm:p-4">
      <span className="text-xs text-muted">{label}</span>
      <strong className="text-lg font-semibold text-navy sm:text-xl">{value}</strong>
    </div>
  );
}
