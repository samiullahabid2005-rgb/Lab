import { Booking } from "@/types";

const BOOKINGS_KEY = "healthpath_demo_bookings";

export function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  if (typeof window === "undefined") return;
  const existing = getStoredBookings();
  const updated = [booking, ...existing];
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
}
