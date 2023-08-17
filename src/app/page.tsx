import { InvoiceTable } from "@/components/invoice-table/invoice-table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <InvoiceTable />
    </main>
  );
}
