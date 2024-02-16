import { PaginationDto } from 'src/types/pagination'
import notify from '../utils/notify'
import Api from './Api'
import { getBooksDto } from 'src/types/book'

export async function getBooks() {
  const { data, error } = await Api.get<PaginationDto<getBooksDto>>(
    '/books?page=0&perPage=999',
  )

  if (error) {
    notify.error('network error !!')
    throw new Error()
  }

  return data
}

export async function getBooksDetails(id: string) {
  const { data, error } = await Api.get<getBooksDto>(
    `/books/${id}`,
  )

  if (error) {
    notify.error('network error !!')
    throw new Error()
  }

  return data
}
