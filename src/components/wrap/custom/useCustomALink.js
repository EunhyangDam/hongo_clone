export default function useCustomAlink() {
  const onClickALink = (e, href, state, bValue) => {
    e.preventDefault();
    console.log(e);
    console.log(href);
    console.log(state);
    console.log(bValue);
  };
  return { onClickALink };
}
