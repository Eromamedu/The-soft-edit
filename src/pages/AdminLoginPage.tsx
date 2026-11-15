
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { isAdminSession } from "../lib/api";
import type { Go } from "../components/ui";

export default function AdminLoginPage({ go }: { go: Go }) {
  const [email, setEmail] = useState("amedubelieve@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (signInError) {
        throw new Error("The email or password you entered is incorrect.");
      }

      // A successful Supabase login does not automatically grant admin access.
      const admin = await isAdminSession();

      if (!admin.ok) {
        await supabase.auth.signOut();
        throw new Error(
          "This account is not authorised to access The Soft Edit administration.",
        );
      }

      go("/admin");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF7F0] px-5 py-12">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => go("/")}
          className="mb-10 text-[10px] font-semibold tracking-[0.18em] text-[#89766A] transition hover:text-[#4B165C]"
        >
          ← BACK TO THE STORE
        </button>

        <div className="border border-[#E6D9CA] bg-[#F7F2EA] px-6 py-9 shadow-[0_20px_70px_rgba(75,22,92,0.07)] sm:px-10 sm:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EDE3E9]">
            <ShieldCheck size={25} className="text-[#4B165C]" />
          </div>

          <p className="mt-7 text-center text-[10px] font-semibold tracking-[0.24em] text-[#7D8768]">
            THE SOFT EDIT · PRIVATE ACCESS
          </p>

          <h1 className="mt-3 text-center font-serif text-4xl italic text-[#4B165C]">
            Welcome back.
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-6 text-[#89766A]">
            Sign in with your authorised administrator account to manage
            your store.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-[10px] font-semibold tracking-[0.14em] text-[#6D594D]"
              >
                ADMIN EMAIL
              </label>

              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your administrator email"
                className="min-h-13 w-full border border-[#D8C8B7] bg-[#FBF7F0] px-4 text-sm text-[#5A4037] outline-none transition focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-[10px] font-semibold tracking-[0.14em] text-[#6D594D]"
              >
                PASSWORD
              </label>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="min-h-13 w-full border border-[#D8C8B7] bg-[#FBF7F0] px-4 pr-12 text-sm text-[#5A4037] outline-none transition focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#89766A] hover:text-[#4B165C]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs leading-5 text-[#8A3434]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#4B165C] px-6 text-[10px] font-semibold tracking-[0.18em] text-white transition hover:bg-[#351043] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  VERIFYING ACCESS...
                </>
              ) : (
                "SIGN IN TO ADMIN"
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-[10px] leading-5 text-[#9A8061]">
            This area is reserved for authorised store administrators.
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.12em] text-[#A18F83]">
          THE SOFT EDIT · LIVE BEAUTIFULLY
        </p>
      </div>
    </main>
  );
}
