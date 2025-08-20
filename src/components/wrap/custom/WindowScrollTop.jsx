import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function WindowScrollTop(props) {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key]);

  useEffect(() => {
    if (location.hash) {
      document
        .querySelector(location.hash)
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash, location.key]);

  return null;
}
