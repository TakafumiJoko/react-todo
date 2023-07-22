export type Todo = {
  id: number;
  title: string;
  status: string;
  content: string;
  created: string;
  updated: string;
}  

export type TodoItemProps = {
  todos: Todo[]; 
  todo: Todo;
  setTodos: (todos: Todo[]) => void;
  setIsEditable: (isEditable: boolean) => void;
  setEditId: (editId: number|null) => void;
  setNewTitle: (newTitle: string) => void;
  setNewContent: (newContent: string) => void;
}  