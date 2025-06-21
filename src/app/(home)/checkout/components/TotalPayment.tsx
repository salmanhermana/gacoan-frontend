import { ScrollText } from "lucide-react";

type Props = {
  total: number;
};

export default function TotalPayment({ total }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-white p-4">
      <h2 className="font-semibold">Total Pembayaran</h2>

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <ScrollText />
          <p className="font-medium">Total Pembayaran</p>
        </div>

        <p className="font-semibold">Rp {total.toLocaleString()}</p>
      </div>
    </section>
  );
}
