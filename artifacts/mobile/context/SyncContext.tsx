import React, { createContext, useCallback, useContext, useState } from "react";

interface SyncContextValue {
  isSyncing: boolean;
  setIsSyncing: (v: boolean) => void;
}

const SyncContext = createContext<SyncContextValue>({
  isSyncing: false,
  setIsSyncing: () => {},
});

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [isSyncing, setIsSyncingRaw] = useState(false);
  const setIsSyncing = useCallback((v: boolean) => setIsSyncingRaw(v), []);
  return (
    <SyncContext.Provider value={{ isSyncing, setIsSyncing }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  return useContext(SyncContext);
}
