// src/features/auth/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Cpu, CheckCircle2, ArrowRight } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { loading, handleLogin, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError("");
  };

  const validate = () => {
    const next = {};
    if (!values.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email, like name@example.com.";
    }
    if (!values.password) {
      next.password = "Enter your password.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setFormError("");
    try {
      const email = values.email;
      const password = values.password;

      const res = await handleLogin({ email, password });

      // If handleLogin returns an error status instead of throwing
      if (res && res.error) {
        setFormError(res.error || "AUTHENTICATION FAILED: INVALID CREDENTIALS.");
        return;
      }

      navigate('/');
    } catch (err) {
      // Extract error message from server response or Axios
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "AUTHENTICATION FAILED: CHECK CREDENTIALS AND TRY AGAIN.";

      setFormError(serverMessage.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-xs text-[#0052FF]">
        <span className="animate-pulse">LOADING TACTICAL PROTOCOLS...</span>
      </div>
    );
  }

  const inputBase =
    "block w-full border bg-slate-900 px-4 py-3.5 text-[15px] leading-6 text-white placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2";
  const inputOk = "border-slate-800 focus:border-[#0052FF] focus:ring-[#0052FF]/30";
  const inputBad = "border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]/30";

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-2 text-slate-100 font-sans selection:bg-[#0052FF] selection:text-white">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-slate-900 border-r-2 border-slate-800 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#0052FF]/15 blur-[120px]" aria-hidden="true" />

        <Link to="/" className="relative flex items-center gap-3 text-white focus:outline-none">
          <div className="w-10 h-10 bg-slate-950 border border-[#0052FF] flex items-center justify-center text-[#0052FF] shadow-[0_0_15px_rgba(0,82,255,0.4)]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-[9px] text-[#0052FF] font-bold tracking-widest uppercase">TACTICAL ENGINE</div>
            <span className="font-display font-black text-lg tracking-tight text-white">GEN-AI<span className="text-[#0052FF]">.CORE</span></span>
          </div>
        </Link>

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0052FF]/15 border border-[#0052FF]/40 text-[#0052FF] font-mono text-[10px] font-bold mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" /> SECURE GATEWAY ACTIVE
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl leading-[1.1] tracking-tight text-white uppercase">
            OPERATOR RE-AUTHENTICATION.
          </h2>
          <p className="mt-6 text-sm leading-7 text-slate-400 font-mono">
            Access your evaluated interview assessments, live skill-gap metrics, and  execution roadmaps.
          </p>
        </div>

        <p className="relative font-mono text-xs text-slate-500">© {new Date().getFullYear()} GEN-AI.CORE SYSTEMS.</p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-10 bg-slate-950">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-white lg:hidden">
            <div className="w-8 h-8 bg-slate-900 border border-[#0052FF] flex items-center justify-center text-[#0052FF]">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-display font-black text-base tracking-tight">GEN-AI<span className="text-[#0052FF]">.CORE</span></span>
          </Link>

          <h1 className="text-3xl font-display font-black tracking-tight text-white uppercase">Sign In</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400 font-mono">
            New operator?{" "}
            <Link to="/register" className="font-bold text-[#0052FF] underline-offset-4 hover:underline">
              Initialize account
            </Link>
          </p>

          {formError && (
            <div role="alert" className="mt-6 border border-[#E11D48]/40 bg-[#E11D48]/10 px-4 py-3 text-xs font-mono text-[#E11D48]">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-xs font-bold uppercase text-slate-300">
                Operator Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="operator@system.io"
                value={values.email}
                onChange={handleChange}
                aria-invalid={errors.email ? "true" : "false"}
                className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
              />
              {errors.email && (
                <p className="mt-2 font-mono text-xs text-[#E11D48]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block font-mono text-xs font-bold uppercase text-slate-300">
                  Access Code / Password
                </label>
                <Link to="/forgot-password" className="font-mono text-xs text-[#0052FF] hover:underline">
                  Reset code?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`${inputBase} pr-12 ${errors.password ? inputBad : inputOk}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-white"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 font-mono text-xs text-[#E11D48]">
                  {errors.password}
                </p>
              )}
            </div>

            <label htmlFor="remember" className="flex cursor-pointer items-center gap-3 font-mono text-xs text-slate-400">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={values.remember}
                onChange={handleChange}
                className="h-4 w-4 bg-slate-900 border-slate-700 text-[#0052FF] focus:ring-[#0052FF]"
              />
              Persist operator session
            </label>

            <button
              type="submit"
              disabled={Loading}
              className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 px-4 py-3.5 font-display font-black text-sm uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all cursor-pointer disabled:opacity-70"
            >
              {Loading ? (
                <span className="font-mono text-xs animate-pulse">AUTHENTICATING...</span>
              ) : (
                <>
                  <span>INITIALIZE SESSION</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}