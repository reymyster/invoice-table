"use client";

import { useLineItems, formatCurrency } from "./data";
import { useColumns } from "./columns";
import { DataTable } from "./data-table";

export function InvoiceTable() {
  const columns = useColumns();
  const data = useLineItems((s) => s.lines);

  const total = data.reduce((p, c) => p + c.total_price, 0);

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <DataTable columns={columns} data={data} />
      <div className="p-4 text-right">Total: {formatCurrency(total)}</div>
    </div>
  );
}
