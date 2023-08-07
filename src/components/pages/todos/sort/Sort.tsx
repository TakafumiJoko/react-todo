import { MouseEvent } from 'react'
import TodosButton from '../../../base/button/TodosButton'
import Span from '../../../base/span/Span'
import type { SortProps } from '../../../../types'
import { useTranslation } from 'react-i18next'

const Sort = ({ value, filteredTodos, setFilteredTodos }: SortProps) => {

  const { t } = useTranslation()

  const handleSortByAscend = (e: MouseEvent<HTMLButtonElement>): void => {
    const { target } = e
    if(target instanceof HTMLButtonElement) {
      if(target.value === 'id' || target.value === 'deadline') {
        const key = target.value
        const newArray = filteredTodos.slice().sort((a, b) => {
          if(a[key] > b[key]) return 1
          if(a[key] < b[key]) return -1
          return 0
        })
        setFilteredTodos(newArray)
      } 
    }
  }  

  const handleSortByDescend = (e: MouseEvent<HTMLButtonElement>): void => {
    const { target } = e
    if(target instanceof HTMLButtonElement) {
      if(target.value === 'id' || target.value === 'deadline') {
        const key = target.value
        const newArray = filteredTodos.slice().sort((a, b) => {
          if(a[key] > b[key]) return -1
          if(a[key] < b[key]) return 1
          return 0
        })
        setFilteredTodos(newArray)
      } 
    }
  }

  return (
    <>
      <Span title={t(`sort.${value}`)}></Span>
      <TodosButton value={value} onClick={handleSortByAscend} title='昇順'></TodosButton>
      <TodosButton value={value} onClick={handleSortByDescend} title='降順'></TodosButton>
    </>
  )  
}

export default Sort