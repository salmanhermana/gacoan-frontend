'use client'
import Button from "@/components/buttons/Button";
import { Table } from "@/types/table/table";

type ChooseTableNumberProps = {
    tables: Table[];
    onClose: () => void;
    onSelect: (table: Table) => void;
};
export default function ChooseTableNumberModal({
    tables,
    onClose,
    onSelect,
}: ChooseTableNumberProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Pilih Nomor Meja</h2>
                <ul className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-3 scrollbar-table-number">
                    {tables.map((table) => (
                        <li key={table.id}>
                            <button
                                className="w-full text-left border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                                onClick={() => onSelect(table)}
                            >
                                {table.table_number}
                            </button>
                        </li>
                    ))}
                </ul>
                <Button
                    className="flex mt-4 text-sm cursor-pointer justify-self-end"
                    variant="red"
                    onClick={onClose}
                >
                    Tutup
                </Button>
            </div>
        </div>
    )
}