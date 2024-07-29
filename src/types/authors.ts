import { Links, Meta } from "./common";

export type AuthorState = {
  authorLoading: boolean;
  authorErrors: any;
  success: boolean;
  authorMessage: string;
  authorList: AuthorList;
  authors: Authors[];
  authorDetail: AuthorDetail;
};

export type AuthorList = {
  data: Authors[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Authors = {
  id: number;
  name: string;
  slug: string;
};

export type AuthorDetail = {
  name: string;
  biography: string;
};
