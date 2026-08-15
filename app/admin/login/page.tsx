"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center p-6 antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px]"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9922A] bg-[#2C1810] shadow-md p-1 mb-3">
            <img src={SITE_CONFIG.logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-[#2C1810] text-xl font-bold font-cinzel tracking-wider uppercase text-center">
            {SITE_CONFIG.shortName}
          </h1>
          <p className="text-[#C9922A] text-[10px] font-bold tracking-[0.25em] uppercase mt-1">
            Admin Management Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg border border-[#D4A96A]/30 px-8 py-10">
          <h2 className="text-[#2C1810] text-xl font-bold font-playfair mb-1">Sign In</h2>
          <p className="text-[#6B4226] text-xs mb-6 font-lato">
            Enter authorized artisan credentials to manage inventory & orders.
          </p>

          <form action={action} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[#2C1810] text-xs font-bold uppercase tracking-wider mb-1.5 font-lato"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@nilamburteakheritage.com"
                className="w-full bg-[#FDFAF5] border border-[#D4A96A]/40 px-4 py-3 text-[#2C1810] text-sm focus:outline-none focus:border-[#C9922A] transition-all rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[#2C1810] text-xs font-bold uppercase tracking-wider mb-1.5 font-lato"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-[#FDFAF5] border border-[#D4A96A]/40 px-4 pr-11 py-3 text-[#2C1810] text-sm focus:outline-none focus:border-[#C9922A] transition-all rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B4226] hover:text-[#2C1810] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <p className="text-red-600 text-xs">{state.error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full group bg-[#C9922A] hover:bg-[#E8B84B] text-[#2C1810] py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg mt-2 shadow"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-[#2C1810]/30 border-t-[#2C1810] rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                <>
                  Access Admin Portal
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[#6B4226]/60 text-[11px] text-center mt-6 uppercase tracking-widest">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}