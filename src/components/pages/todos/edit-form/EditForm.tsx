import Input from '../../../base/input/Input'
import TextArea from '../../../base/text-area/TextArea'
import TodosButton from '../../../base/button/TodosButton'
import { ChangeEvent } from 'react'
import { EditFormProps } from '../../../../types'
import { today } from '../../../../functions/date'

const EditForm = ({editId, newTitle, newContent, newDeadline, todos, setTodos, setIsEditable, setEditId, setNewTitle, setNewContent, setNewDeadline}: EditFormProps) => {
  
  const handleEditTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value)
  }

  const handleEditTodo = (): void => {
    const newArray = todos.map((todo) => todo.id === editId ? {...todo, title: newTitle, content: newContent, updated: today(), deadline: newDeadline} : todo)
    setTodos(newArray)
    setNewTitle('')
    setNewContent('')
    setNewDeadline('')
    handleCloseEditForm()
  }

  const handleCloseEditForm = (): void => {
    setEditId(null)
    setIsEditable(false)
  }

  const handleEditContentFormChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewContent(e.target.value)
  }

  const handleEditDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewDeadline(e.target.value)
  }

  return (
    <>
      <Input
        type='text'
        value={newTitle}
        onChange={handleEditTitleFormChange}
      />
      <TextArea name="内容" value={newContent} onChange={handleEditContentFormChange} cols={30} rows={10}></TextArea>
      <Input type="date" value={newDeadline} onChange={handleEditDeadlineFormChange}/>
      <TodosButton onClick={handleEditTodo} title='編集を保存'></TodosButton>
      <TodosButton onClick={handleCloseEditForm} title='キャンセル'></TodosButton>
    </>
  )
}

export default EditForm