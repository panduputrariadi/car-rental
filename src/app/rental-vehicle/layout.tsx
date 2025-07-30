"use client"; // Mark as client component since we'll use hooks

import { useState, useEffect } from "react";
import BottomMenuCustomer from "@/components/layout/BottomMenuCustomer";
import NavbarCustomer from "@/components/layout/NavbarCustomer";
import SideBarCustomer from "@/components/layout/SideBarCustomer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full">
          {!isSmallDevice && <SideBarCustomer />}
          {isSmallDevice && <BottomMenuCustomer />}
          <div className="w-full">
            <NavbarCustomer />
            <div className="px-4">{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default Layout;
