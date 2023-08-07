import Select from '../../../base/select/Select'
import { ChangeEvent } from 'react'
import type { OptionProps, FilterProps } from '../../../../types'

const Filter = ({ filter, setFilter, todos, setFilteredTodos }: FilterProps) => {

  const filterOptions: OptionProps[] = [
    { value: 'all', title: 'すべて' },
    { value: 'notStarted', title: '未着手' },
    { value: 'inProgress', title: '作業中' },
    { value: 'done', title: '完了' }
  ]

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value)
    const newArray = todos.filter((todo) => todo.status === e.target.value)
    setFilteredTodos(newArray)
  } 

  return (
    <Select
      name='ステータス'
      value={filter}
      onChange={handleFilterChange}
    >
      {filterOptions}
    </Select>
  )
}

export default Filter