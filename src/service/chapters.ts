import { PaginationDto } from 'src/types/pagination'
import notify from '../utils/notify'
import Api from './Api'
import { getChapterDto } from 'src/types/chapter'

export async function getChapters(bookId: string) {
  const { data, error } = await Api.get<PaginationDto<getChapterDto>>(
    `/chapters?page=0&perPage=9999&bookId=${bookId}`,
  )

  if (error) {
    notify.error('network error !!')
    throw new Error()
  }

  return data
}

export async function deleteChapter(chapterId: string) {
  try {
     await Api.delete<any>(`/chapters/${chapterId}`)
  } catch (error) {
    notify.error('network error !!')
    throw new Error()
  }
}
