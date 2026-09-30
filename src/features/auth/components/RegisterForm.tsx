"use client";

import { isCorporateEmail } from "@/shared/lib/validators";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validación básica en el cliente, según las reglas de tu documento
    // (contraseñas coincidentes). La validación de formato completa
    // (mayúscula, número, símbolo, etc.) la reforzará el backend.
    if (!isCorporateEmail(email)) {
      setError("Please use your corporate/work email address (personal providers like Gmail or Yahoo are not allowed).");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!agreedToTerms) {
      setError("Debes aceptar los Términos de Servicio.");
      return;
    }

    // Placeholder: aquí luego llamaremos a authApi.ts -> POST /auth/register
    console.log({ fullName, email, password });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Join FinSight AI to start monitoring your financial intelligence.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Nombre completo */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Correo de trabajo */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Work Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-label="Mostrar u ocultar contraseña"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Aceptar términos */}
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
            .
          </span>
        </label>

        {/* Mensaje de error */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Botón de submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
}