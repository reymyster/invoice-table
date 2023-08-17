"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type LineItem } from "./data";

export function useColumns(): ColumnDef<LineItem>[] {
  return [
    {
      accessorKey: "name",
      header: "Description",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "unit_price",
      header: "Unit Price",
    },
    {
      accessorKey: "total_price",
      header: "Total Price",
      cell: ({ row }) => {
        const { quantity, unit_price } = row.original;
        const total_price = quantity * unit_price;
        const { format } = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        return <div className="text-right">{format(total_price)}</div>;
      },
    },
  ];
}
