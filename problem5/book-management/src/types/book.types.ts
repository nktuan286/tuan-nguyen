export interface IBook {
  title: string;
  author: string;
  description: string;
  price: number;
  isbn: string;
  publishedYear: number;
}

export interface BookFilters {
  title?: RegExp | string;
  author?: RegExp | string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  publishedYear?: number;
}
