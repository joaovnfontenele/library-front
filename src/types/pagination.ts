export interface PaginationDto<T> {
  data: T[]
  options: Options
}

export interface Options {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  prev: number
  next: number
}
