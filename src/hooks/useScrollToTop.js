// src/hooks/useScrollToTop.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [router.pathname, router.asPath]); // Se ejecutará cada vez que cambie la ruta
};

export default useScrollToTop;
