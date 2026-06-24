import { useMemo } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useQueueStore } from "./queueStore";
import type { TaskStatus } from "@/entities/generation-task";
import type { SortOrder } from "./types";

interface FilterSortState {
  statusFilter: TaskStatus | "all";
  sortOrder: SortOrder;
  searchQuery: string;
  setStatusFilter: (filter: TaskStatus | "all") => void;
  setSortOrder: (order: SortOrder) => void;
  setSearchQuery: (query: string) => void;
}

export const useFilterSortStore = create<FilterSortState>((set) => ({
  statusFilter: "all",
  sortOrder: "newest",
  searchQuery: "",
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const filterOptions: { value: TaskStatus | "all"; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "queued", label: "В очереди" },
  { value: "running", label: "Идёт" },
  { value: "done", label: "Готово" },
  { value: "failed", label: "Ошибка" },
];

export const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
];

export function useQueueFilterSort() {
  const { tasks } = useQueueStore(useShallow((s) => ({ tasks: s.tasks })));
  const {
    statusFilter,
    sortOrder,
    searchQuery,
    setStatusFilter,
    setSortOrder,
    setSearchQuery,
  } = useFilterSortStore(
    useShallow((s) => ({
      statusFilter: s.statusFilter,
      sortOrder: s.sortOrder,
      searchQuery: s.searchQuery,
      setStatusFilter: s.setStatusFilter,
      setSortOrder: s.setSortOrder,
      setSearchQuery: s.setSearchQuery,
    }))
  );

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks;

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.prompt.toLowerCase().includes(q) ||
          t.model.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    sorted.sort((a, b) =>
      sortOrder === "newest"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );

    return sorted;
  }, [tasks, statusFilter, sortOrder, searchQuery]);

  const filterOptionsWithActive = useMemo(() => {
    return filterOptions.map((opt) => ({
      ...opt,
      isActive: opt.value === statusFilter,
    }));
  }, [statusFilter]);

  const sortOptionsWithActive = useMemo(() => {
    return sortOptions.map((opt) => ({
      ...opt,
      isActive: opt.value === sortOrder,
    }));
  }, [sortOrder]);

  const activeSortLabel = sortOptionsWithActive.find((o) => o.isActive)?.label;

  return {
    statusFilter,
    sortOrder,
    searchQuery,
    setStatusFilter,
    setSortOrder,
    setSearchQuery,
    filteredAndSortedTasks,
    filterOptionsWithActive,
    sortOptionsWithActive,
    activeSortLabel,
  };
}
