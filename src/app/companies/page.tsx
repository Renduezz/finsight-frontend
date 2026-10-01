"use client";

import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import DashboardLayout from "@/shared/components/DashboardLayout";
import { useCompany } from "@/shared/context/CompanyContext";

export default function CompaniesPage() {
  const { companies, activeCompany, setActiveCompanyId, addCompany, isLoading, error } = useCompany();
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    try {
      await addCompany({ name, sector });
      setName("");
      setSector("");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not create the company.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-slate-900">Companies</h1>
      <p className="mt-1 text-sm text-slate-500">Manage the businesses linked to your account.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-700">New company</p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Company name</label>
              <input
                type="text"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Corp"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Sector</label>
              <input
                type="text"
                required
                minLength={3}
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Retail, Technology, Services..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> {isSubmitting ? "Creating..." : "Create company"}
          </button>
        </form>

        <div className="lg:col-span-2">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {isLoading && <p className="text-sm text-slate-400">Loading companies...</p>}

          {!isLoading && companies.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
              No companies yet. Create your first one using the form.
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveCompanyId(company.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  activeCompany?.id === company.id
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-slate-800">{company.name}</p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{company.sector}</p>
                {activeCompany?.id === company.id && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}