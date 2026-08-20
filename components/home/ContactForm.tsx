"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { InputField, TextareaField } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: ContactForm = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function validate(): Partial<ContactForm> {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{10,14}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm(emptyForm);
      showToast("Message sent — our team will get back to you shortly.");
    }, 700);
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <InputField
          label="Full name"
          id="contact-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="Email"
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <InputField
            label="Phone number"
            id="contact-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
          />
        </div>
        <TextareaField
          label="Message"
          id="contact-message"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          error={errors.message}
          placeholder="How can we help?"
        />
        <Button type="submit" disabled={submitting} className="w-full sm:w-fit">
          <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
