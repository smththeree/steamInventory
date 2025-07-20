import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/shared/api/query-instance";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
