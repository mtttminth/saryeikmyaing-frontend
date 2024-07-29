import exp from "constants";

export type CategoryState = {
  loading: boolean;
  categoryErrors: any;
  success: boolean;
  categoryMessage: string;
  categories: Category[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  subcategories: SubCategory[];
};

export type SubCategory = {
  id: number;
  slug: string;
  name: string;
};
