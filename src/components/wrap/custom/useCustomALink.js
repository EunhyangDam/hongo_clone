import { useNavigate } from "react-router-dom";

export default function useCustomAlink() {
  const nav = useNavigate();
  const onClickALink = (e, href, state, bValue) => {
    e.preventDefault();
    if (href === null) return;
    else if (/^https?:\/\//.test(href)) return window.open(href);
    else if (bValue === "smooth") return;
    else if (/^#/.test(href)) return nav({ hash: href });
    nav({ pathname: href }, { state: state });
  };
  return { onClickALink };
}
