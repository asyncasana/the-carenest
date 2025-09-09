import { Container } from "../../components/ui/Container";

export default function DirectoryPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Directory</h1>
      <div className="mb-8">
        {/* Search + filters toolbar placeholder */}
        <div className="rounded-lg bg-white/80 border border-neutral-200 p-4 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search care options..."
            className="flex-1 px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-200 text-lg"
          />
          {/* Add filter dropdowns here */}
        </div>
      </div>
      {/* Card grid placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Entry cards will go here */}
        <div className="rounded-xl bg-white/90 border border-neutral-200 p-6 text-neutral-700 shadow-sm text-center">
          <div className="font-semibold text-lg mb-2">
            Entry Card Placeholder
          </div>
          <div className="text-sm">Entry summary and details...</div>
        </div>
      </div>
    </Container>
  );
}
