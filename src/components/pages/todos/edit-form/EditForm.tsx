import TodosButton from '../../../base/button/TodosButton'
import { ChangeEvent, useState } from 'react'
import { EditFormProps } from '../../../../types'
import { today } from '../../../../functions/date'
import { FormControl, TextField } from '@mui/material'
import { Textarea, Input, Button } from '@mui/joy'

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
      <div>
        <TextField
          style={{ 'margin': '8px' }}
          label="タイトル"
          InputLabelProps={{ shrink: true }}
          value={newTitle}
          onChange={handleEditTitleFormChange}
          margin="normal" 
          fullWidth={true} />
      </div>
      <div>
        <TextField
          style={{ 'margin': '8px' }}
          multiline={true}
          label="内容"
          InputLabelProps={{ shrink: true }}
          name="内容" 
          value={newContent} 
          onChange={handleEditContentFormChange}
          margin="normal" 
          fullWidth={true} />
      </div>
      <div>
        <TextField
          style={{ 'margin': '8px' }}
          label="期限"
          InputLabelProps={{ shrink: true }}
          type="date" 
          value={newDeadline} 
          onChange={handleEditDeadlineFormChange}
          margin="normal" 
          fullWidth={true} />
      </div>
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