// src/features/auth/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 7) {
      setError("PASSWORD MUST BE AT LEAST 7 CHARACTERS.");
      return;
    }

    setError("");

    try {
      const email = form.email;
      const username = form.name;
      const password = form.password;

      const res = await handleRegister({ username, email, password });

      // If handleRegister returns an error object without throwing
      if (res && res.error) {
        setError(res.error || "REGISTRATION VECTOR FAILED.");
        return;
      }

      navigate('/login');
    } catch (err) {
      // Extract specific backend error (e.g. "User/Email already exists")
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "REGISTRATION VECTOR FAILED: EMAIL MIGHT ALREADY BE IN USE.";

      setError(serverMessage.toUpperCase());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-xs text-[#0052FF]">
        <span className="animate-pulse">INITIALIZING OPERATOR...</span>
      </div>
    );
  }

  const inputClass =
    "w-full border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/30";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#0052FF] selection:text-white">
      <div className="grid min-h-screen lg:grid-cols-[50%_50%]">

        {/* Left brand panel */}
        <aside className="relative hidden overflow-hidden bg-slate-900 border-r-2 border-slate-800 lg:flex lg:flex-col lg:justify-between lg:p-14">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#0052FF]/15 blur-[120px]" aria-hidden="true" />

          <Link to="/" className="flex w-fit items-center gap-3">
            <div className="w-10 h-10 bg-slate-950 border border-[#0052FF] flex items-center justify-center text-[#0052FF] shadow-[0_0_15px_rgba(0,82,255,0.4)]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#0052FF] font-bold tracking-widest uppercase">TACTICAL ENGINE</div>
              <span className="font-display font-black text-lg tracking-tight text-white">GEN-AI<span className="text-[#0052FF]">.CORE</span></span>
            </div>
          </Link>

          <div className="my-12 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" /> SYSTEM ENROLLMENT OPEN
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl leading-[1.1] tracking-tight text-white uppercase">
              DEPLOY YOUR
              <br />
              OPERATOR PROFILE.
            </h1>
            <p className="mt-6 font-mono text-sm leading-relaxed text-slate-400">
              Generate precise technical challenge vectors, critical gap analyses, and tailored preparation strategies in seconds.
            </p>
          </div>

          <p className="font-mono text-xs text-slate-500">
            SYSTEM VERSION 2.6 // SECURE NODE
          </p>
        </aside>

        {/* Right registration panel */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16 bg-slate-950">
          <div className="w-full max-w-md">

            <h2 className="text-3xl font-display font-black tracking-tight uppercase text-white">
              Create Account
            </h2>

            <p className="mt-2 font-mono text-sm text-slate-400">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-[#0052FF] underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Username */}
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs font-bold uppercase text-slate-300">
                  Operator Handle
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="commander_01"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs font-bold uppercase text-slate-300">
                  Tactical Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="operator@system.io"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block font-mono text-xs font-bold uppercase text-slate-300">
                  Access Code / Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min 7 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={7}
                    className={`${inputClass} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-4 font-mono text-xs text-slate-400 hover:text-white"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="border border-[#E11D48]/40 bg-[#E11D48]/10 px-4 py-3 font-mono text-xs text-[#E11D48]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 py-3.5 font-display font-black text-sm uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all cursor-pointer"
              >
                <span>INITIALIZE ACCOUNT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-8 text-center font-mono text-xs text-slate-500">
              By initializing an account, you agree to secure protocol{" "}
              <Link to="/terms" className="text-[#0052FF] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#0052FF] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}