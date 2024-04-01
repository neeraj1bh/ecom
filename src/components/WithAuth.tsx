import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "~/hooks/useAuthenticated";

export default function withAuth(Component: React.ComponentType<any>) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const isAuthenticated = useAuthenticated();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      if (!isAuthenticated) {
        router.push("/");
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isClient || !isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
