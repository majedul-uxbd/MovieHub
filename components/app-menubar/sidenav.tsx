"use client";

import {
  GiftIcon,
  LayoutDashboard,
  MenuIcon,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CSSObject, Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { SidebarFooter } from "../ui/sidebar";
import { NavUser } from "./nav-user";

interface SidebarPageProps {
  session: any;
}

const SidebarPage = ({ session }: SidebarPageProps) => {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 780;
      setIsMobile(isSmallScreen);

      if (isSmallScreen) {
        setCollapsed(true); // Always collapse on mobile
      } else {
        const savedState = localStorage.getItem("sidebarCollapsed");
        setCollapsed(savedState === "true");
      }
    };

    // Check screen size on load and add event listener for resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) return; // Prevent toggling on mobile screens

    const newState = !collapsed;
    setCollapsed(newState);

    // Save the new collapsed state to localStorage
    localStorage.setItem("sidebarCollapsed", String(newState));
  };

  if (collapsed === null) {
    // Render nothing until the state is restored
    return null;
  }

  const headerHeight = "57px";
  const footerHeight = "57px";
  const sidebarWidth = collapsed ? "80px" : "240px";

  const sidebarStyles: CSSObject = {
    backgroundColor: "hsl(var(--background))",
    borderRight: "1px solid hsl(var(--border))",
    transition: "all 0.3s ease-in-out",
    boxShadow: "none",
    position: "fixed",
    top: headerHeight,
    bottom: footerHeight,
    width: sidebarWidth,
    height: `calc(100% - ${headerHeight})`,
    "&:hover": {
      backgroundColor: "hsl(var(--background))",
    },
  };

  const containerStyles: React.CSSProperties = {
    marginLeft: sidebarWidth,
    transition: "margin-left 0.3s ease-in-out",
  };

  const isActiveRoute = (route: string) => pathname === route;

  return (
    <div className="z-50">
      <Sidebar
        backgroundColor="bg-background"
        collapsed={collapsed}
        rootStyles={sidebarStyles}
      >
        <div className="flex flex-col h-full justify-around">
          <Menu className="h-full">
            <MenuItem onClick={toggleSidebar} className="hidden md:block">
              <MenuIcon className="ml-2 size-6 " />
            </MenuItem>
            {session?.role === "admin" && (
              <Link href="/dashboard">
                <MenuItem
                  className={isActiveRoute("/dashboard") ? "bg-slate-100" : ""}
                  icon={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <UsersRound className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          className="ml-8 text-black bg-white border p-2"
                        >
                          Users
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                >
                  Users
                </MenuItem>
              </Link>
            )}

            {session?.role === "user" && (
              <Link href="/user">
                <MenuItem
                  className={isActiveRoute("/user") ? "bg-slate-100" : ""}
                  icon={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <LayoutDashboard className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          className="ml-8 text-black bg-white border p-2"
                        >
                          Dashboard
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                >
                  Dashboard
                </MenuItem>
              </Link>
            )}

            {session?.role === "user" && (
              <Link href="/user/donation">
                <MenuItem
                  className={isActiveRoute("/user/donation") ? "bg-slate-100" : ""}
                  icon={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <GiftIcon className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          className="ml-8 text-black bg-white border p-2"
                        >
                          Donation Record
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                >
                  Donation Record
                </MenuItem>
              </Link>
            )}

            {session?.role === "admin" && (
              <Link href="/dashboard/donation">
                <MenuItem
                  className={isActiveRoute("/dashboard/donation") ? "bg-slate-100" : ""}
                  icon={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <GiftIcon className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          className="ml-8 text-black bg-white border p-2"
                        >
                          Donation Record
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                >
                  Donation Record
                </MenuItem>
              </Link>
            )}
          </Menu>
          <SidebarFooter className="mb-2">
            <NavUser session={session} />
          </SidebarFooter>
        </div>
      </Sidebar>

      <div style={containerStyles}></div>
    </div>
  );
};

export default SidebarPage;
