"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 antialiased relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 relative mb-3 drop-shadow-xl flex items-center justify-center p-1 bg-white/10 rounded-2xl backdrop-blur-md border border-white/15">
            <Image
              src="/images/logo-proper.png"
              alt="Nilambur Teak Heritage"
              fill
              className="object-contain p-1"
            />
          </div>
          <h1 className="text-white text-lg font-bold font-cinzel tracking-wider uppercase text-center">
            Nilambur Teak Heritage
          </h1>
          <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
            Admin Studio Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-8 border border-slate-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Sign in to Console</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your credentials to manage products, hero videos & inquiries.
            </p>
          </div>

          <form action={action} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue="admin@nilamburteakheritage.com"
                  placeholder="admin@nilamburteakheritage.com"
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-11 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <p className="text-rose-600 text-xs font-medium">{state.error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold py-3 text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isPending ? "Authenticating..." : "Access Studio"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-[11px] mt-6">
          © {new Date().getFullYear()} Nilambur Teak Heritage™. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}