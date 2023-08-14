import { TextField } from '@mui/material'
import { TextFieldsProps } from '../../../types'
import { useContext } from 'react'
import { TextFieldsContext } from '../../../Context'

const TextFields = ({handleTitleFormChange, handleContentFormChange, handleDeadlineFormChange}: TextFieldsProps) => {

  const { newTitle, newContent, newDeadline } = useContext(TextFieldsContext)

  return (
    <>
     <div>
      <TextField
        style={{ 'margin': '8px' }}
        label="タイトル"
        InputLabelProps={{ shrink: true }}
        value={newTitle}
        onChange={handleTitleFormChange}
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
          onChange={handleContentFormChange}
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
          onChange={handleDeadlineFormChange}
          margin="normal" 
          fullWidth={true} />
      </div>
    </>
  )
}

export default TextFields