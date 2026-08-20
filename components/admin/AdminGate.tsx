"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { InputField } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Layout";
import { siteConfig } from "@/data/site-config";

const SESSION_KEY = "healthpath_admin_demo_session";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser storage on mount requires this
    setAuthed(window.sessionStorage.getItem(SESSION_KEY) === "true");
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username === siteConfig.admin.demoUsername && password === siteConfig.admin.demoPassword) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid demo credentials. Check the hint below.");
    }
  }

  if (authed === null) return null;

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm py-16">
        <Card className="p-6">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <h1 className="mt-3 text-center text-xl font-semibold text-ink">Admin Demo Login</h1>
          <p className="mt-1 text-center text-sm text-ink-soft">Front-end only demo — no real authentication.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <InputField
              label="Username"
              id="admin-username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Password"
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p role="alert" className="text-xs font-medium text-danger">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-4 rounded-lg bg-teal-50 px-3 py-2 text-center font-data text-xs text-teal-700">
            Demo login — {siteConfig.admin.demoUsername} / {siteConfig.admin.demoPassword}
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
