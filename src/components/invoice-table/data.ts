import { create } from "zustand";
import { ulid } from "ulidx";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type LineItem = {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

type State = {
  lines: LineItem[];
};

type Action = {
  addLine: () => void;
  setName: ({ id, name }: Pick<LineItem, "id" | "name">) => void;
  setQuantity: ({ id, quantity }: Pick<LineItem, "id" | "quantity">) => void;
  setUnitPrice: ({
    id,
    unit_price,
  }: Pick<LineItem, "id" | "unit_price">) => void;
  delete: ({ id }: Pick<LineItem, "id">) => void;
};

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

const data: LineItem[] = JSON.parse(
  '[{"id":"8041fb60-ed43-44c2-8e16-d463a951295b","name":"repellendus optio modi","quantity":454,"unit_price":377.99,"total_price":0},{"id":"bb84e678-db16-4157-8748-ef4b52b60d1f","name":"necessitatibus possimus amet","quantity":746,"unit_price":409.05,"total_price":0},{"id":"5e7e15e9-1c40-4499-878e-2f8d5f7c6589","name":"veniam a sapiente","quantity":243,"unit_price":497.25,"total_price":0},{"id":"576a750c-6524-4a5f-afad-b48438f0680c","name":"ipsum magnam mollitia","quantity":427,"unit_price":821.56,"total_price":0},{"id":"74b6583d-1800-4a33-aada-c61fde1f64d5","name":"laborum earum quam","quantity":290,"unit_price":891.74,"total_price":0}]',
);

data.forEach((d) => (d.total_price = d.quantity * d.unit_price));

export function useLineItemsFromURL() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()!;

  let lines = (() => {
    let parsedSuccessfully = true;
    let tmp: LineItem[] | undefined;

    if (searchParams.has("b") && searchParams.get("b")) {
      try {
        tmp = JSON.parse(searchParams.get("b") ?? "");
      } catch (err) {
        parsedSuccessfully = false;
        console.error(err);
      }
    }

    return tmp ?? data;
  })();

  const set = useCallback(
    (items: LineItem[]) => {
      const params = new URLSearchParams(searchParams);
      const str = JSON.stringify(items);
      console.log({ encodedLength: str.length });
      params.set("b", str);

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const addLine = useCallback(() => {
    lines.push({
      id: ulid(),
      name: "",
      quantity: 0,
      unit_price: 0,
      total_price: 0,
    });
    set(lines);
  }, [set, lines]);

  const setQuantity = useCallback(
    ({ id, quantity }: { id: string; quantity: number }) => {
      var line = lines.find((l) => l.id === id);
      if (line) {
        line.quantity = quantity;
        line.total_price = quantity * line.unit_price;
        set(lines);
      }
    },
    [set, lines],
  );

  const setUnitPrice = useCallback(
    ({ id, unit_price }: { id: string; unit_price: number }) => {
      var line = lines.find((l) => l.id === id);
      if (line) {
        line.unit_price = unit_price;
        line.total_price = line.quantity * unit_price;
        set(lines);
      }
    },
    [set, lines],
  );

  const setName = useCallback(
    ({ id, name }: { id: string; name: string }) => {
      var line = lines.find((l) => l.id === id);
      if (line) {
        line.name = name;
        set(lines);
      }
    },
    [set, lines],
  );

  const deleteItem = useCallback(
    ({ id }: { id: string }) => {
      const filtered = lines.filter((l) => l.id !== id);
      set(filtered);
    },
    [set, lines],
  );

  return {
    data: lines,
    addLine,
    setQuantity,
    setUnitPrice,
    setName,
    deleteItem,
  };
}

export const useLineItems = create<State & Action>((set) => ({
  lines: data,
  addLine: () =>
    set((prev) => ({
      lines: [
        ...prev.lines,
        {
          id: ulid(),
          name: "",
          quantity: 0,
          unit_price: 0,
          total_price: 0,
        },
      ],
    })),
  setName: ({ id, name }) =>
    set((prev) => ({
      lines: prev.lines.map((line) =>
        line.id === id ? { ...line, name } : line,
      ),
    })),
  setQuantity: ({ id, quantity }) =>
    set((prev) => ({
      lines: prev.lines.map((line) =>
        line.id === id
          ? { ...line, quantity, total_price: quantity * line.unit_price }
          : line,
      ),
    })),
  setUnitPrice: ({ id, unit_price }) =>
    set((prev) => ({
      lines: prev.lines.map((line) =>
        line.id === id
          ? { ...line, unit_price, total_price: line.quantity * unit_price }
          : line,
      ),
    })),
  delete: ({ id }) =>
    set((prev) => ({
      lines: prev.lines.filter((l) => l.id !== id),
    })),
}));
