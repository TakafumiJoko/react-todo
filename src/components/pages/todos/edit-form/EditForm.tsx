import TodosButton from '../../../base/button/TodosButton'
import { ChangeEvent, useState, useContext } from 'react'
import { EditFormProps } from '../../../../types'
import { today } from '../../../../functions/date'
import { FormControl, TextField } from '@mui/material'
import { Textarea, Input, Button } from '@mui/joy'
import TextFields from '../../../common/form/TextFields'

const EditForm = ({editId, newTitle, newContent, newDeadline, todos, setTodos, setIsEditable, setEditId, setNewTitle, setNewContent, setNewDeadline}: EditFormProps) => {
  
  const handleEditTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value)
  }

  const handleEditContentFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewContent(e.target.value)
  }

  const handleEditDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewDeadline(e.target.value)
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

  return (
    <>
      <TextFields 
        handleTitleFormChange={handleEditTitleFormChange}
        handleContentFormChange={handleEditContentFormChange}
        handleDeadlineFormChange={handleEditDeadlineFormChange}
      />
      <div>
        <FormControl>
          <Button 
            style={{ 'margin': '8px' }}
            onClick={handleEditTodo}
            color="neutral"
            variant="outlined"
          >編集を保存
          </Button>
        </FormControl>
        <FormControl>
          <Button 
            style={{ 'margin': '8px' }}
            onClick={handleCloseEditForm}
            color="neutral"
            variant="outlined"
          >キャンセル
          </Button>
        </FormControl>
      </div>
    </>
  )
}

export default EditForm