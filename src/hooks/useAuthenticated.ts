import { useState } from "react";

export function useAuthenticated() {
  const [isAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        const { isLoggedIn } = JSON.parse(storedUser);
        return isLoggedIn;
      }
    }
    return false;
  });

  return isAuthenticated;
}
