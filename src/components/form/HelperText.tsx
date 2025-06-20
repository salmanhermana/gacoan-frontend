import clsxm from "@/lib/clsxm";
import { ReactNode } from "react";
import Typography from "../Typography";

export default function HelperText({
  children,
  helperTextClassName,
}: {
  children: ReactNode;
  helperTextClassName?: string;
}) {
  return (
    <div className="flex space-x-1">
      <Typography
        as="p"
        font="Inter"
        weight="regular"
        variant="p"
        className={clsxm(
          "text-xs !leading-tight text-gray-900",
          helperTextClassName,
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
