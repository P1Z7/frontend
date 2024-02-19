"use client";

import { ReactNode, useEffect, useState } from "react";

const DEFERRED_MS = 500;

interface Props {
  fallback: ReactNode;
  isFetching: boolean;
}

function DeferredSuspense({ fallback, isFetching }: Props) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, DEFERRED_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) return null;

  return <>{isFetching && fallback}</>;
}

export default DeferredSuspense;
