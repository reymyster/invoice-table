"use client";

import { type LineItem } from "./data";
import { useColumns } from "./columns";
import { DataTable } from "./data-table";
// import { faker } from "@faker-js/faker";

// const data: LineItem[] = new Array(5).fill(0).map((i) => ({
//   id: faker.string.uuid(),
//   name: faker.lorem.words(3),
//   quantity: faker.number.int({ max: 1000 }),
//   unit_price: Number(faker.finance.amount({ dec: 2, max: 1000 })),
//   total_price: 0,
// }));

// console.log({ data: JSON.stringify(data) });

const data: LineItem[] = JSON.parse(
  '[{"id":"8041fb60-ed43-44c2-8e16-d463a951295b","name":"repellendus optio modi","quantity":454,"unit_price":377.99,"total_price":0},{"id":"bb84e678-db16-4157-8748-ef4b52b60d1f","name":"necessitatibus possimus amet","quantity":746,"unit_price":409.05,"total_price":0},{"id":"5e7e15e9-1c40-4499-878e-2f8d5f7c6589","name":"veniam a sapiente","quantity":243,"unit_price":497.25,"total_price":0},{"id":"576a750c-6524-4a5f-afad-b48438f0680c","name":"ipsum magnam mollitia","quantity":427,"unit_price":821.56,"total_price":0},{"id":"74b6583d-1800-4a33-aada-c61fde1f64d5","name":"laborum earum quam","quantity":290,"unit_price":891.74,"total_price":0}]',
);

export function InvoiceTable() {
  const columns = useColumns();

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
