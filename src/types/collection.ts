export type ItemFormat = {
  name: string;
  qty: string;
  text: string;
  destriptions: string[];
};

export type ItemLabel = {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}

export type ItemArtist = {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

export type ItemBasicInformation = {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  thumb: string;
  cover_image: string;
  title: string;
  year: number;
  formats: ItemFormat[];
  labels: ItemLabel[];
  artists: ItemArtist[];
  genres: string[];
  styles: string[];
}

export type ItemType = {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: ItemBasicInformation
  user_name: string;
}

export type PaginationUrls = {
  last?: string;
  next?: string;
  first?: string;
  prev?: string
}

export type Pagination = {
  page: number;
  pages: number;
  per_page: number;
  items: number
  urls: PaginationUrls
}

export type Collection = {
  pagination: Pagination;
  releases: ItemType[]
}
