"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  // Estado controlado: React "recuerda" lo que el usuario escribe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // evita que el navegador recargue la página
    // Por ahora solo mostramos los datos en consola.
    // Aquí más adelante llamaremos a authApi.ts -> POST /auth/login
    console.log({ email, password, rememberMe });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">
        Please enter your details to access your financial intelligence
        portal.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Campo de correo */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Campo de contraseña con botón de mostrar/ocultar */}
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

        {/* Recordarme + olvidé contraseña */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary"
            />
            Remember for 30 days
          </label>
          <a href="#" className="font-medium text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Log In →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-medium text-primary hover:underline">
          Create account
        </a>
      </p>
    </div>
  );
}