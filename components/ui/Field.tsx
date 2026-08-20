import { cn } from "@/lib/utils";
import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldBase =
  "w-full rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-teal-600 focus:outline-none";

function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, id, required, className, ...rest }: InputFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, error && "border-danger", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export function SelectField({ label, error, id, required, options, placeholder, className, ...rest }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, error && "border-danger", className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextareaField({ label, error, id, required, className, ...rest }: TextareaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, "min-h-[100px] resize-y", error && "border-danger", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}
