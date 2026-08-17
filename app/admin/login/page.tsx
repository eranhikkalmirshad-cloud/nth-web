"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0E0B08] flex items-center justify-center p-4 sm:p-6 antialiased relative overflow-hidden font-sans">
      
      {/* ── Atmospheric Ambient Lighting ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8A572A]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Centered Card Box ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10 py-8"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-7 text-center">
          <div className="w-18 h-18 relative mb-4 p-2 bg-[#1C140E] rounded-2xl border border-[#8A572A]/40 shadow-2xl backdrop-blur-md">
            <Image
              src="/images/logo-proper.png"
              alt="Nilambur Teak Heritage"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <h1 className="text-white text-lg sm:text-xl font-cinzel font-bold tracking-wider uppercase">
            Nilambur Teak Heritage
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E] animate-pulse" />
            <p className="text-[#E5B56E] text-[10px] font-bold tracking-[0.25em] uppercase">
              ADMIN STUDIO PORTAL
            </p>
          </div>
        </div>

        {/* Login White Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-9 border border-slate-100/90 relative">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-cinzel text-slate-900">Sign in to Console</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Enter your credentials to manage products, categories, hero showcases & inquiries.
            </p>
          </div>

          <form action={action} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue="admin@nilamburteakheritage.com"
                  placeholder="admin@nilamburteakheritage.com"
                  className="w-full bg-[#FAF9F7] border border-slate-200 pl-10 pr-4 py-3 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all rounded-xl shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  defaultValue="admin@nilambur2026"
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F7] border border-slate-200 pl-10 pr-11 py-3 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all rounded-xl shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <p className="text-rose-600 text-xs font-medium">{state.error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1C130D] hover:bg-[#8A572A] text-white font-bold py-3.5 text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3 active:scale-[0.98]"
            >
              <span>{isPending ? "Authenticating..." : "Access Studio"}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>

        {/* Footer Attribution */}
        <p className="text-center text-slate-500 text-[11px] mt-6 tracking-wide">
          © {new Date().getFullYear()} Nilambur Teak Heritage™. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}