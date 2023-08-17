"use client";

import { useState, ChangeEvent } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Minus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type LineItem, useLineItems, formatCurrency } from "./data";

function toNumberOrZero(value: string): number {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}

export function useColumns(): ColumnDef<LineItem>[] {
  const setName = useLineItems((s) => s.setName);
  const setQuantity = useLineItems((s) => s.setQuantity);
  const setUnitPrice = useLineItems((s) => s.setUnitPrice);
  const deleteItem = useLineItems((s) => s.delete);

  return [
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete line item {row.original.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Please confirm you wish to remove this line item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteItem({ id: row.original.id })}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      accessorKey: "name",
      header: "Description",
      cell: ({ row }) => {
        const [value, setValue] = useState(row.original.name);
        const onChange = (e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value);
        const onBlur = () => setName({ id: row.original.id, name: value });
        return (
          <div>
            <Input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Description"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const [value, setValue] = useState(row.original.quantity.toString());
        const onChange = (e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value);
        const onBlur = () =>
          setQuantity({ id: row.original.id, quantity: toNumberOrZero(value) });
        return (
          <div>
            <Input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={(e) => e.target.select()}
              type="number"
              className="max-w-[150px] text-right"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "unit_price",
      header: "Unit Price",
      cell: ({ row }) => {
        const [value, setValue] = useState(row.original.unit_price.toString());
        const onChange = (e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value);
        const onBlur = () =>
          setUnitPrice({
            id: row.original.id,
            unit_price: toNumberOrZero(value),
          });
        return (
          <div>
            <Input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={(e) => e.target.select()}
              type="number"
              className="max-w-[200px] text-right"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "total_price",
      header: "Total Price",
      cell: ({ row }) => {
        const { quantity, unit_price } = row.original;
        const total_price = quantity * unit_price;
        return <div className="text-right">{formatCurrency(total_price)}</div>;
      },
    },
  ];
}
