export type CollectionState = {
  collectionLoading: boolean;
  collectionErrors: any;
  success: boolean;
  collectionMessage: string;
  collections: Collection[];
};

export type Collection = {
  id: number;
  name: string;
  slug: string;
  cover_url: string[];
  books: Book[];
};

export type Book = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
};
