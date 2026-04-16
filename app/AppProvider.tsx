"use client";

import { createContext, useContext, useState } from "react";

// Tạo con text: kho chứa dữ liệu global
const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

// Hook custom giúp dễ dùng hơn  const { sessionToken } = useAppContext();
/**
 * Nếu KHÔNG có useAppContext
        import { useContext } from "react";
        import { AppContext } from "./AppProvider";
        const { sessionToken } = useContext(AppContext);
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Thằng này dùng để cung cấp dữ liệu global cho toàn app bằng context api
// Provider bọc app
export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  // Tạo state global
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    // Đóng gói vào context: tất cả component bên trong đều đc dùng sessionToken
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
