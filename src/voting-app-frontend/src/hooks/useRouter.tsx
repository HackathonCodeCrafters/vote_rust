"use client";

import { useEffect, useState } from "react";

interface UseRouterReturn {
  currentPage: string;
  navigate: (page: string) => void;
  handleNavigation: (page: string, isAuthenticated: boolean) => void;
}

export function useRouter(): UseRouterReturn {
  const [currentPage, setCurrentPage] = useState("landing");

  const protectedRoutes = [
    "dashboard",
    "votes",
    "proposals",
    "history",
    "governance",
  ];

  // Handle browser navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.slice(1); // Remove leading slash

      if (path === "pricing") {
        setCurrentPage("pricing");
      } else if (path === "about") {
        setCurrentPage("about");
      } else if (protectedRoutes.includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage("landing");
      }
    };

    handleRouteChange();
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Navigate to a page
  const navigate = (page: string) => {
    if (page === "" || page === "landing") {
      window.history.pushState({}, "", "/");
      setCurrentPage("landing");
    } else {
      window.history.pushState({}, "", `/${page}`);
      setCurrentPage(page);
    }
  };

  // Handle navigation with auth check
  const handleNavigation = (page: string, isAuthenticated: boolean) => {
    if (protectedRoutes.includes(page) && !isAuthenticated) {
      alert("Please connect your Internet Identity first!");
      return;
    }

    navigate(page);
  };

  return {
    currentPage,
    navigate,
    handleNavigation,
  };
}
