"use client";

import { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLineItems, useLineItemsFromURL } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const addLine = useLineItems((s) => s.addLine);
  const { addLine } = useLineItemsFromURL();

  return (
    <div className="flex justify-end">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          type="button"
          title="Add New Line Item"
          onClick={addLine}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Line
        </Button>
      </div>
    </div>
  );
}
