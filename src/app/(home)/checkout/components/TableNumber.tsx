type TableNumberProps = {
    selectedTable: {
        id: string;
        table_number: string;
    } | null;
    onOpenModal: () => void;
};

export default function TableNumber({ selectedTable, onOpenModal }: TableNumberProps) {
    return (
        <div className="mb-4">
            <button
                onClick={onOpenModal}
                className="border px-4 py-2 rounded-md font-medium bg-white hover:bg-gray-100 transition cursor-pointer"
            >
                {selectedTable ? `Meja: ${selectedTable.table_number}` : "Pilih Nomor Meja"}
            </button>
        </div>
    )
}