export const backgroundColor = (status: string): string => {
  switch (status) {
    case 'notStarted': 
      return 'red'
    case 'inProgress':
      return 'yellow'
    case 'done':
      return 'blue'
    default:
      return 'red'
  } 
}