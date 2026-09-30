"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export interface TransactionRecord {
  fecha: string;
  tipo: "INGRESO" | "GASTO";
  categoria: string;
  monto: number;
  descripcion: string;
}

export interface UploadRecord {
  fileName: string;
  date: string;
  size: string;
  status: "Completed" | "Processing" | "Error";
  errorMessage?: string;
}

interface Kpis {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  cashFlow: number;
}

interface TrendPoint {
  month: string;
  income: number;
  expenses: number;
}

interface CategorySlice {
  name: string;
  value: number;
}

interface TransactionsContextValue {
  transactions: TransactionRecord[];
  uploads: UploadRecord[];
  kpis: Kpis;
  monthlyTrend: TrendPoint[];
  categoryBreakdown: CategorySlice[];
  addUpload: (records: TransactionRecord[], upload: UploadRecord) => void;
  clearAll: () => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [uploads, setUploads] = useState<UploadRecord[]>([]);

  function addUpload(records: TransactionRecord[], upload: UploadRecord) {
    setTransactions((prev) => [...prev, ...records]);
    setUploads((prev) => [upload, ...prev]);
  }

  function clearAll() {
    setTransactions([]);
    setUploads([]);
  }

  const kpis = useMemo<Kpis>(() => {
    const totalIncome = transactions.filter((t) => t.tipo === "INGRESO").reduce((sum, t) => sum + t.monto, 0);
    const totalExpenses = transactions.filter((t) => t.tipo === "GASTO").reduce((sum, t) => sum + t.monto, 0);
    const netProfit = totalIncome - totalExpenses;
    const cashFlow = netProfit;
    return { totalIncome, totalExpenses, netProfit, cashFlow };
  }, [transactions]);

  const monthlyTrend = useMemo<TrendPoint[]>(() => {
    const map = new Map<string, { income: number; expenses: number }>();
    for (const t of transactions) {
      const parsedDate = new Date(t.fecha);
      const label = MONTH_NAMES[parsedDate.getMonth()] ?? "N/A";
      const entry = map.get(label) ?? { income: 0, expenses: 0 };
      if (t.tipo === "INGRESO") entry.income += t.monto;
      else entry.expenses += t.monto;
      map.set(label, entry);
    }
    return MONTH_NAMES.filter((m) => map.has(m)).map((m) => ({ month: m, ...map.get(m)! }));
  }, [transactions]);

  const categoryBreakdown = useMemo<CategorySlice[]>(() => {
    const income = transactions.filter((t) => t.tipo === "INGRESO").reduce((s, t) => s + t.monto, 0);
    const expenses = transactions.filter((t) => t.tipo === "GASTO").reduce((s, t) => s + t.monto, 0);
    if (income === 0 && expenses === 0) return [];
    return [
      { name: "Income", value: income },
      { name: "Expenses", value: expenses },
    ];
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, uploads, kpis, monthlyTrend, categoryBreakdown, addUpload, clearAll }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
  return ctx;
}