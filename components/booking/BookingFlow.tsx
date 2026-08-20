"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingSteps from "@/components/booking/BookingSteps";
import SelectItemStep, { BookingSelection } from "@/components/booking/SelectItemStep";
import PatientDetailsStep, { validatePatient, PatientErrors } from "@/components/booking/PatientDetailsStep";
import CollectionModeStep from "@/components/booking/CollectionModeStep";
import ScheduleStep from "@/components/booking/ScheduleStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import { Booking, BookingMode, PatientDetails } from "@/types";
import { generateBookingId } from "@/lib/utils";
import { saveBooking } from "@/lib/mock-storage";
import { getTestById } from "@/data/tests";
import { getPackageBySlug, packages } from "@/data/packages";

const emptyPatient: PatientDetails = { name: "", age: "", gender: "", phone: "", email: "", address: "" };

function initialSelection(searchType: string | null, searchId: string | null): BookingSelection | null {
  if (!searchType || !searchId) return null;
  if (searchType === "test") {
    const t = getTestById(searchId);
    if (t) return { type: "test", id: t.id, name: t.name, price: t.discountPrice ?? t.price };
  }
  if (searchType === "package") {
    const p = packages.find((pk) => pk.id === searchId) ?? getPackageBySlug(searchId);
    if (p) return { type: "package", id: p.id, name: p.name, price: p.price };
  }
  return null;
}

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<BookingSelection | null>(() =>
    initialSelection(searchParams.get("type"), searchParams.get("id"))
  );
  const [patient, setPatient] = useState<PatientDetails>(emptyPatient);
  const [patientErrors, setPatientErrors] = useState<PatientErrors>({});
  const [mode, setMode] = useState<BookingMode | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const { showToast } = useToast();

  function goNext() {
    if (step === 1 && !selection) {
      showToast("Please select a test or package to continue.", "error");
      return;
    }
    if (step === 2) {
      const errors = validatePatient(patient);
      setPatientErrors(errors);
      if (Object.keys(errors).length > 0) {
        showToast("Please fix the highlighted fields.", "error");
        return;
      }
    }
    if (step === 3 && !mode) {
      showToast("Please choose a collection mode.", "error");
      return;
    }
    if (step === 4) {
      if (!date || !timeSlot) {
        showToast("Please select a date and time slot.", "error");
        return;
      }
      submitBooking();
    }
    setStep((s) => Math.min(s + 1, 5));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function submitBooking() {
    if (!selection || !mode) return;
    const newBooking: Booking = {
      bookingId: generateBookingId(),
      itemType: selection.type,
      itemId: selection.id,
      itemName: selection.name,
      price: selection.price,
      patient,
      mode,
      date,
      timeSlot,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveBooking(newBooking);
    setBooking(newBooking);
    showToast("Your booking has been confirmed!");
  }

  return (
    <Card className="p-6 sm:p-8">
      <BookingSteps current={step} />

      <div className="mt-8">
        {step === 1 && <SelectItemStep selection={selection} onSelect={setSelection} />}
        {step === 2 && <PatientDetailsStep patient={patient} errors={patientErrors} onChange={setPatient} />}
        {step === 3 && <CollectionModeStep mode={mode} onChange={setMode} />}
        {step === 4 && (
          <ScheduleStep date={date} timeSlot={timeSlot} onChangeDate={setDate} onChangeTimeSlot={setTimeSlot} />
        )}
        {step === 5 && booking && <ConfirmationStep booking={booking} />}
      </div>

      {step < 5 && (
        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <Button variant="ghost" onClick={goBack} disabled={step === 1}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={goNext}>
            {step === 4 ? "Confirm Booking" : "Continue"}
            {step < 4 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </Card>
  );
}
