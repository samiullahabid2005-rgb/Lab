"use client";

import { InputField, SelectField, TextareaField } from "@/components/ui/Field";
import { PatientDetails } from "@/types";

export type PatientErrors = Partial<Record<keyof PatientDetails, string>>;

export function validatePatient(p: PatientDetails): PatientErrors {
  const errors: PatientErrors = {};
  if (!p.name.trim()) errors.name = "Please enter the patient's full name.";
  const age = Number(p.age);
  if (!p.age || Number.isNaN(age) || age <= 0 || age > 120) errors.age = "Enter a valid age (1–120).";
  if (!p.gender) errors.gender = "Please select a gender.";
  if (!/^[0-9+\-\s]{10,14}$/.test(p.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!/^\S+@\S+\.\S+$/.test(p.email.trim())) errors.email = "Enter a valid email address.";
  if (!p.address.trim() || p.address.trim().length < 8) errors.address = "Please enter a complete address.";
  return errors;
}

export default function PatientDetailsStep({
  patient,
  errors,
  onChange,
}: {
  patient: PatientDetails;
  errors: PatientErrors;
  onChange: (patient: PatientDetails) => void;
}) {
  function update<K extends keyof PatientDetails>(key: K, value: PatientDetails[K]) {
    onChange({ ...patient, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InputField
        label="Full name"
        id="patient-name"
        required
        value={patient.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
        placeholder="e.g. Aarav Singh"
      />
      <InputField
        label="Age"
        id="patient-age"
        required
        type="number"
        min={1}
        max={120}
        value={patient.age}
        onChange={(e) => update("age", e.target.value)}
        error={errors.age}
        placeholder="e.g. 34"
      />
      <SelectField
        label="Gender"
        id="patient-gender"
        required
        value={patient.gender}
        onChange={(e) => update("gender", e.target.value as PatientDetails["gender"])}
        error={errors.gender}
        placeholder="Select gender"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
      />
      <InputField
        label="Phone number"
        id="patient-phone"
        required
        type="tel"
        value={patient.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
        placeholder="e.g. 98765 43210"
      />
      <InputField
        label="Email"
        id="patient-email"
        required
        type="email"
        value={patient.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
        placeholder="e.g. name@example.com"
        className="sm:col-span-2"
      />
      <TextareaField
        label="Address"
        id="patient-address"
        required
        value={patient.address}
        onChange={(e) => update("address", e.target.value)}
        error={errors.address}
        placeholder="House/flat, street, area, city, PIN code"
        className="sm:col-span-2"
      />
    </div>
  );
}
