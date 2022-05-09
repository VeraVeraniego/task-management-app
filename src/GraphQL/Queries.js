import { gql } from '@apollo/client'

export const LOAD_TASKS_FRAGMENT = gql`
	fragment loadTaskFragment on Task {
    id
    assignee{
      avatar
      fullName
      email
    }
    creator{
      fullName
      email
    }
    pointEstimate
    dueDate
    name
    status
    tags
    __typename
	} 
`;

export const LOAD_TASKS_BACKLOG = gql`
  ${LOAD_TASKS_FRAGMENT}
  query bklog {
    tasks(input:{ status:  BACKLOG}){
      ...loadTaskFragment
    }
  }
`;
export const LOAD_TASKS_CANCELLED = gql`
${LOAD_TASKS_FRAGMENT}
  query bklog {
    tasks(input:{ status:  CANCELLED}){
      ...loadTaskFragment
    }
  }
`
export const LOAD_TASKS_DONE = gql`
${LOAD_TASKS_FRAGMENT}
query bklog {
  tasks(input:{ status:  DONE}){
    ...loadTaskFragment
  }
}
`
export const LOAD_TASKS_IN_PROGRESS = gql`
${LOAD_TASKS_FRAGMENT}
  query bklog {
    tasks(input:{ status:  IN_PROGRESS}){
      ...loadTaskFragment
    }
  }
`
export const LOAD_TASKS_TODO = gql`
${LOAD_TASKS_FRAGMENT}
  query bklog {
    tasks(input:{ status:  TODO}){
      ...loadTaskFragment
    }
  }
`