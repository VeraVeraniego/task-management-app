import { gql } from '@apollo/client'
import { LOAD_TASKS_FRAGMENT } from './Queries';

export const CREATE_TASK = gql`
${LOAD_TASKS_FRAGMENT}
mutation CreateTask($input:CreateTaskInput!) {
    createTask(input:$input) {
      ...loadTaskFragment
    }
  }
  
`;

