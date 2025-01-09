// search list params model
export interface IListParams {
  total: number;
  page: number;
  category?: ICategory;
}
// category model
export interface ICategory {
  id?: string; // optional for better db indexing
  key?: string; // used as url param
  value?: string; // used for display purposes
}
// our project model
export interface IProject {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: ICategory; // this is now modeled
  dateCreated?: Date;
}
