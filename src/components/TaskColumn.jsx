import React from 'react';
import TaskCard from '../components/TaskCard';
import "../stylesheets/TaskColumn.css"


const TaskColumn = ({ tasksdata, colName }) => {
	return (

		<section className="taskColumn">
			<header>{colName.toUpperCase()+" ("+ tasksdata.length+")"} </header>
			{
				tasksdata.map((tsk)=>{
						
					return(
					<TaskCard 
					key={tsk.id}
					name={tsk.name}
					points={tsk.pointEstimate}
					dueDate={tsk.dueDate}
					tags={tsk.tags}
					assigneeName={tsk.assignee.fullName}
					avatar={tsk.assignee.avatar}
					 />
					);
				})
			}

		</section>
	);

}
export default TaskColumn;