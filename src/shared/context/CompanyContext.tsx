"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getCompanies, createCompany, Company, CreateCompanyPayload } from "@/features/companies/services/companyApi";

interface CompanyContextValue {
  companies: Company[];
  activeCompany: Company | null;
  isLoading: boolean;
  error: string;
  setActiveCompanyId: (id: number) => void;
  refreshCompanies: () => Promise<void>;
  addCompany: (payload: CreateCompanyPayload) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextValue | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeCompanyId, setActiveCompanyId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshCompanies = useCallback(async () => {
    // Sin sesión iniciada no tiene sentido pedir empresas (el backend rechazaría con 401)
    const hasToken = typeof window !== "undefined" && localStorage.getItem("finsight_token");
    if (!hasToken) return;

    setIsLoading(true);
    setError("");
    try {
      const data = await getCompanies();
      setCompanies(data);
      if (data.length > 0 && activeCompanyId === null) {
        setActiveCompanyId(data[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load companies.");
    } finally {
      setIsLoading(false);
    }
  }, [activeCompanyId]);

  useEffect(() => {
    refreshCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addCompany(payload: CreateCompanyPayload) {
    const newCompany = await createCompany(payload);
    setCompanies((prev) => [...prev, newCompany]);
    setActiveCompanyId(newCompany.id);
  }

  const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? null;

  return (
    <CompanyContext.Provider
      value={{ companies, activeCompany, isLoading, error, setActiveCompanyId, refreshCompanies, addCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompany must be used within CompanyProvider");
  return ctx;
}