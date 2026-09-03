import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(72),
});

export type AuthUser = { email: string };

export function AuthDialog({
  open,
  onOpenChange,
  onAuthed,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuthed: (user: AuthUser) => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    onAuthed({ email: parsed.data.email });
    onOpenChange(false);
    toast.success(mode === "signup" ? "Account created. Welcome aboard!" : "Welcome back!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {mode === "signup" ? "Create your account" : "Log in"}
          </DialogTitle>
        </DialogHeader>
        <p className="-mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-success" />
          No OTP. No email verification. Instant access.
        </p>
        <form onSubmit={submit} className="mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auth-email">Email address</Label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {mode === "signup" ? "Create Account" : "Log In"}
          </Button>
        </form>
        <button
          type="button"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        >
          {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
