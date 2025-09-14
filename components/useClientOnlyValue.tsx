import { useEffect, useState } from "react";

// This hook is used to prevent hydration mismatches on web
// by returning different values on the server and client.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? client : server;
}
