import { usePathname } from "next/navigation";

export const validateEdit = (condition: boolean) => {
  const isEditPage = usePathname() !== "/post";
  return isEditPage ? condition : false;
};
