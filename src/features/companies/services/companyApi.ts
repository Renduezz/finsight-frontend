import { apiFetch } from "@/shared/lib/apiClient";

export interface Company {
  id: number;
  name: string;
  sector: string;
  taxId?: string;
  userId: number;
}

export interface CreateCompanyPayload {
  name: string;
  sector: string;
  taxId?: string;
}

export function getCompanies() {
  return apiFetch<Company[]>("/companies", { method: "GET" });
}

export function createCompany(payload: CreateCompanyPayload) {
  return apiFetch<Company>("/companies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}