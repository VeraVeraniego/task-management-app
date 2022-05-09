import React, { useEffect, useState } from 'react';
import {
  RiMenuLine,
  RiFunctionLine,
  RiSearchLine,
  RiNotification3Line,
  RiAddFill
} from 'react-icons/ri';
import Ravn1 from './ravn.svg';
import Ravn2 from './ravndot.svg';
import UserPic from './images/userpic.png';
import './App.css';
import TaskColumn from './components/TaskColumn';
import { useQuery, gql, useMutation } from '@apollo/client';
import {
  LOAD_TASKS_BACKLOG,
  LOAD_TASKS_CANCELLED,
  LOAD_TASKS_DONE,
  LOAD_TASKS_IN_PROGRESS,
  LOAD_TASKS_TODO
} from './GraphQL/Queries';
import Modal from './components/Modal';
import { useModal } from './hooks/useModal';
import { CREATE_TASK } from './GraphQL/Mutations';
// import FormHook from './hooks/FormHook';


const App = () => {

  // method to get column from child
  const getColumn = (col) => {
    setColumn(col);
  }
  //Custom hook to handle Modal states
  const [isOpenModal, openModal, closeModal] = useModal(false);

  // Querying the API to get data for each task state
  const { data: backlogData, refetch: backlogRefetch, loading: backlogLoading } = useQuery(LOAD_TASKS_BACKLOG);
  const { data: cancelledData, refetch: cancelledRefetch, loading: cancelledLoading } = useQuery(LOAD_TASKS_CANCELLED);
  const { data: doneData, refetch: doneRefetch, loading: doneLoading } = useQuery(LOAD_TASKS_DONE);
  const { data: inProgressData, refetch: inProgressRefetch, loading: inProgressLoading } = useQuery(LOAD_TASKS_IN_PROGRESS);
  const { data: todoData, refetch: todoRefetch, loading: todoLoading } = useQuery(LOAD_TASKS_TODO);

  // Mutation to create a new task
  const [createTask] = useMutation(CREATE_TASK);

  // state send to child to refetch certain column
  const [column, setColumn] = useState("");

  //refetchdata from certain column when task is created
  useEffect(() => {
    if (column == "BACKLOG") backlogRefetch();
    if (column == "CANCELLED") cancelledRefetch();
    if (column == "DONE") doneRefetch();
    if (column == "IN_PROGRESS") inProgressRefetch();
    if (column == "TODO") todoRefetch();

  }, [column]);

  return (
    <div className="App">

      {/* SideBar */}
      <nav className="sideBar">
        <div className="ravnLogo">
          <img className="ravnLogo__main" src={Ravn1}></img>
          <img className="ravnLogo__dot" src={Ravn2}></img>
        </div>
        <ul>
          <li className="sideBar__tab sideBar__tab--active">
            <RiFunctionLine className="sideBar__tab__icon" /> <span>DASHBOARD</span>
          </li>
          <li className="sideBar__tab">
            <RiMenuLine className="sideBar__tab__icon" /> <span>MY TASK</span>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main>

        {/* search bar */}
        <div className="searchBar">
          <RiSearchLine className="searchBar__icon" />
          <input placeholder="Search" />
          <RiNotification3Line className="searchBar__icon" />
          <img src={UserPic}></img>
        </div>

        {/* topbar */}
        <div className="topBar">
          <button className="topBar__styleButton"><RiMenuLine className="topBar__icon" /></button>
          <button className="topBar__styleButton topBar__styleButton--active" ><RiFunctionLine className="topBar__icon" /></button>
          <button className='topBar__addButton' onClick={openModal}><RiAddFill className="topBar__icon" /></button>
          <Modal isOpen={isOpenModal} closeModal={closeModal} mutation={createTask} getColumn={getColumn}></Modal>
          {/* <FormHook/> */}
        </div>

        {/* Task Columns */}
        <div className="taskColumn-container">
          {backlogLoading ? <p>Loading...</p> : <TaskColumn tasksdata={backlogData.tasks} colName="BACKLOG" />}
          {cancelledLoading ? <p>Loading...</p> : <TaskColumn tasksdata={cancelledData.tasks} colName="CANCELLED" />}
          {doneLoading ? <p>Loading...</p> : <TaskColumn tasksdata={doneData.tasks} colName="DONE" />}
          {inProgressLoading ? <p>Loading...</p> : <TaskColumn tasksdata={inProgressData.tasks} colName="IN PROGRESS" />}
          {todoLoading ? <p>Loading...</p> : <TaskColumn tasksdata={todoData.tasks} colName="TODO" />}

        </div>
      </main>


    </div>
  );
}

export default App;
