import { ChangeEvent, MouseEvent, ReactNode } from 'react'

type Todo = {
  id: number;
  title: string;
  status: any;
  content: string;
  created: string;
  updated: string;
  deadline: string;
  backgroundColor: string;
}  

type TodoProps = {
  todos: Todo[]; 
  todo: Todo;
  setTodos: (todos: Todo[]) => void;
  setIsEditable: (isEditable: boolean) => void;
  setEditId: (editId: number|null) => void;
  setNewTitle: (newTitle: string) => void;
  setNewContent: (newContent: string) => void;
  setNewDeadline: (newDeadline: string) => void;
}  

type InputProps = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type TextAreaProps = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  cols: number;
  rows: number;
}

type TodosButtonProps = {
  value?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

type TodoButtonProps = {
  todo: Todo;
  onClick: (todo: Todo) => void;
  title: string;
}

type SelectProps = {
  children: OptionProps[];
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>, todo?: Todo) => void;
}

type OptionProps = {
  value: string;
  title: string;
}

type SpanProps = {
  title: string;
}

type LiProps = {
  children: ReactNode;
  todo: Todo;
}

type EditFormProps = {
  editId: number|null;
  newTitle: string;
  newContent: string;
  newDeadline: string;
  todos: Todo[]; 
  setTodos: (todos: Todo[]) => void;
  setIsEditable: (isEditable: boolean) => void;
  setEditId: (editId: number|null) => void;
  setNewTitle: (newTitle: string) => void;
  setNewContent: (newContent: string) => void;
  setNewDeadline: (newDeadline: string) => void;
}

type NewFormProps = {
  todos: Todo[]; 
  setTodos: (todos: Todo[]) => void;
}

type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  todos: Todo[]; 
  setFilteredTodos: (todos: Todo[]) => void; 
}

type SortProps = {
  value: string;
  filteredTodos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void; 
}

type TextFieldsProps = {
  handleTitleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleContentFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeadlineFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type { Todo, TodoProps, InputProps, TextAreaProps, TodosButtonProps, TodoButtonProps, SelectProps, OptionProps, SpanProps, LiProps, EditFormProps, NewFormProps, FilterProps, SortProps, TextFieldsProps } 