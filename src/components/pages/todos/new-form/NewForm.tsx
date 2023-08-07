import Input from '../../../base/input/Input'
import TextArea from '../../../base/text-area/TextArea'
import TodosButton from '../../../base/button/TodosButton'
import { useState, ChangeEvent } from 'react'
import type { NewFormProps } from '../../../../types'
import { backgroundColor } from '../../../../functions/todo'
import { today } from '../../../../functions/date'

const NewForm = ({todos, setTodos}: NewFormProps) => {

  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoId, setTodoId] = useState<number>(todos.length + 1)
  const [todoContent, setTodoContent] = useState<string>('')
  const [todoDeadline, setTodoDeadline] = useState<string>('')

  const handleAddTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value)
  }

  const handleAddTodo = (): void => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted', content: todoContent, created: today(), updated: today(), deadline: todoDeadline, backgroundColor: backgroundColor('notStarted') }])
    setTodoId(todoId + 1)
    resetFormInput()
  }

  const resetFormInput = (): void => {
    setTodoTitle('')
    setTodoContent('')
  }

  const handleAddDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoDeadline(e.target.value)
  }

  const handleAddContentFormChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTodoContent(e.target.value)
  }

  return (
    <>
      <Input 
        type='text'
        value={todoTitle}
        onChange={handleAddTitleFormChange}
      />
      <TextArea name="内容" value={todoContent} onChange={handleAddContentFormChange} cols={30} rows={10}></TextArea>
      <Input type="date" value={todoDeadline} onChange={handleAddDeadlineFormChange}/>
      <TodosButton value='' onClick={handleAddTodo} title='作成'></TodosButton>
    </>
  )
}

export default NewForm