"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-gold-dark/60 bg-background-elevated px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 outline-none transition-colors focus:border-gold";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessKey) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", accessKey);

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={5}
        className={inputClass}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="hex-panel-sm cursor-pointer border border-gold bg-gold px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-background uppercase transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-xs tracking-widest text-accent uppercase">
            Message sent
          </p>
        )}
        {status === "error" && (
          <p className="text-xs tracking-widest text-red-400 uppercase">
            {accessKey
              ? "Something went wrong, try again"
              : "Form not configured yet"}
          </p>
        )}
      </div>
    </form>
  );
}
