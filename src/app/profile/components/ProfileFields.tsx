export default function ProfileField({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between items-center pb-4 border-b gap-4 ${className}`}
    >
      <div className="min-w-0 flex-1">
        {" "}
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-lg truncate">{value || "-"}</div>
      </div>
    </div>
  );
}
