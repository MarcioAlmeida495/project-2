import { isClient } from "./functions";
export const handleKeyUp = (e, value, setHasPayment, setSearch) => {
  if(e.key === 'Enter') {
    // console.log(value);
    // console.log(isClient(value));
    // type = isClient(value);
    setHasPayment(isClient(value))
    // console.log(type)
    setSearch(value);
  }
}
