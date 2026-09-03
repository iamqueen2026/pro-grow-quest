import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Copy, Landmark, Lock, ShieldCheck } from "lucide-react";

const BANK = [
  { label: "Bank Name", value: "JP Morgan Chase NA" },
  { label: "Bank Address", value: "270 Park Avenue, New York, NY 10017" },
  { label: "Account Number", value: "30000005290573" },
  { label: "Routing Number (ACH)", value: "028000024" },
  { label: "Account Type", value: "Checking (Current)" },
];

const schema = z.object({
  fullName: z.string().trim().max(100).optional(),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\+1[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: "Use US format: +1 (555) 123-4567",
    }),
  reference: z.string().trim().max(120).optional(),
});

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Copy failed — please copy manually");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate font-display text-sm font-semibold sm:text-base">{value}</p>
      </div>
      <Button type="button" variant="outline" size="icon" aria-label={`Copy ${label}`} onClick={copy}>
        {copied ? <Check className="text-success" /> : <Copy />}
      </Button>
    </div>
  );
}

export function PaymentSection() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "+1 ", reference: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setSuccess(true);
    setForm({ fullName: "", email: "", phone: "+1 ", reference: "" });
  };

  return (
    <section id="payment" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-success">
            <Lock className="size-3.5" /> 100% Encrypted &amp; Bank Grade Secure Payment Process
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Pay by <span className="gradient-text">US ACH Bank Transfer</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Transfer <strong className="text-foreground">$299</strong> directly to our US ACH bank
            details below, then submit your details to confirm. No card required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="surface-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <Landmark className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">ACH Bank Details</h3>
                <p className="text-sm text-muted-foreground">Tap any field to copy instantly</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {BANK.map((row) => (
                <CopyRow key={row.label} label={row.label} value={row.value} />
              ))}
              <div className="flex items-center justify-between rounded-lg border border-accent/40 bg-accent/10 px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Amount Due
                </p>
                <p className="font-display text-xl font-bold text-accent">$299.00 USD</p>
              </div>
            </div>
          </div>

          <div className="surface-card rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">Confirm Your Payment</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Already sent the transfer? Submit your details and our US team takes it from here.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pay-name">Full Name</Label>
                <Input
                  id="pay-name"
                  maxLength={100}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="John Carter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-email">Email Address *</Label>
                <Input
                  id="pay-email"
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@carterplumbing.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-phone">Phone Number (US) *</Label>
                <Input
                  id="pay-phone"
                  type="tel"
                  required
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-ref">Transaction ID / Reference Note (Optional)</Label>
                <Input
                  id="pay-ref"
                  maxLength={120}
                  value={form.reference}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                  placeholder="ACH reference or note"
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" variant="cta" size="xl" className="w-full">
                Confirm My Payment
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-success" /> Your information is encrypted and
                never shared.
              </p>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Payment Submitted</DialogTitle>
          </DialogHeader>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success">
            <Check className="size-7" />
          </span>
          <p className="text-muted-foreground">
            Thank you! Our US team is verifying your payment and will contact you via Email/Phone
            within 1–2 hours.
          </p>
          <Button variant="hero" onClick={() => setSuccess(false)}>
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
