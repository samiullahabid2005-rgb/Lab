import { GraduationCap, Stethoscope, Clock3 } from "lucide-react";
import { Doctor } from "@/types";
import { Card } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 font-display text-xl font-semibold text-teal-700">
        {initials}
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{doctor.name}</h3>
      <p className="flex items-center gap-1.5 text-xs text-ink-soft">
        <GraduationCap className="h-3.5 w-3.5" /> {doctor.qualification}
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-teal-700">
        <Stethoscope className="h-3.5 w-3.5" /> {doctor.specialization}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
        <Clock3 className="h-3.5 w-3.5" /> {doctor.experienceYears}+ years experience
      </p>
      <p className="mt-3 text-sm text-ink-soft">{doctor.bio}</p>
      <p className="mt-2 text-[11px] text-ink-soft/70">{doctor.registrationPlaceholder}</p>
      <Button variant="outline" size="sm" className="mt-4">
        View Profile
      </Button>
    </Card>
  );
}
