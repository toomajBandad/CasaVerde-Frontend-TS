import Swal from "sweetalert2";
import type { NavigateFunction } from "react-router-dom";

export function handlePropertySearch(
  navigate: NavigateFunction,
  city: string,
  typeCat: string,
  contractCat: string
) {
  if (!city || !contractCat || !typeCat) {
    Swal.fire({
      icon: "error",
      title: "Please, Select All Items",
      text: "There is some unselected item!",
    });
    return;
  }

  navigate(
    `/searchproperty?city=${city}&type=${typeCat}&contract=${contractCat}`
  );
}
