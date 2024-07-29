import { Links, Meta } from "./common";

export type PreorderState = {
  preorderLoading: boolean;
  preorderErrors: any;
  success: boolean;
  preorderMessage: string;
  preorderList: PreorderList;
  preorders: Preorder[];
};

export type PreorderList = {
  data: Preorder[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Preorder = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
};
