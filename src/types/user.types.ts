export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  username?: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
}

export type SortField = 'id' | 'name' | 'email' | 'status';
export type SortOrder = 'asc' | 'desc';

export interface UserFilters {
  search: string;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}
