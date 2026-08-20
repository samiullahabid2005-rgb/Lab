import { LabTest } from "@/types";
import TestCard from "@/components/tests/TestCard";

export default function RelatedTests({ tests }: { tests: LabTest[] }) {
  if (tests.length === 0) return null;
  return (
    <div className="mt-14">
      <h2 className="text-xl font-semibold text-ink">Related Tests</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tests.map((t) => (
          <TestCard key={t.id} test={t} />
        ))}
      </div>
    </div>
  );
}
