import { useEffect, useState } from 'react';
// import useForm from '../hooks/FormHook';
import '../stylesheets/Modal.css'

const Modal = ({ isOpen, closeModal, mutation, getColumn }) => {

	const handleSubmit = (event) => {
		event.preventDefault();
		//verifies that every input is OK and only then call mutation function
		if (assigneeId && dueDate && name && pointEstimate && status && tags.length) {
			mutation({
				variables: {
					"input": {
						assigneeId,
						dueDate,
						name,
						pointEstimate,
						status,
						tags
					}
				}
			});
			
			event.target.reset();
			closeModal(event);
			getColumn(status);

		} else alert("BAD INPUT: Make sure you select all the fields and set the task title input.");

	}

	//Function that toogles tags on checkboxes
	const handleCheckboxChange = (event) => {
		// if already in the array, removes it
		if (tags.includes(event.target.value)) {
			let temp = [...tags];
			temp.splice(tags.findIndex(e => e == event.target.value), 1);
			setTags(temp);
			// else add it to array
		} else {
			setTags([...tags, event.target.value]);
		}
	}

	// Definition of Task States
	// new Date().toISOString().slice(0,16)
	const [assigneeId, setAssigneeId] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [name, setName] = useState("");
	const [pointEstimate, setPointsEstimate] = useState("");
	const [status, setStatus] = useState("");
	const [tags, setTags] = useState([]);

	// closes Modal when clicked out of it.
	const handleModalContainerClick = (event) => {
		event.stopPropagation();
	}


	return (
		<article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
			<div className="modal-container" onClick={handleModalContainerClick}>

				<form onSubmit={handleSubmit}>
					<input type="text" required name="title" className="taskTitle" onChange={(event) => { setName(event.target.value) }} placeholder="Task Title" />
					<div className="selectors-container">

						{/* TASK ESTIMATE POINTS INPUT */}
						<select required onChange={(event) => { setPointsEstimate(event.target.value) }} className="selector" defaultValue="" name="estimate" id="estimate">
							<option disabled value="">Estimate</option>
							<option value="ZERO">ZERO</option>
							<option value="ONE">ONE</option>
							<option value="TWO">TWO</option>
							<option value="FOUR">FOUR</option>
							<option value="EIGHT">EIGHT</option>
						</select>

						{/* TASK ASSIGNEE INPUT */}
						{/* The assignation of options values should be done with a Query and mapping (Stand-by) */}
						<select onChange={(event) => { setAssigneeId(event.target.value) }} className="selector" defaultValue="" required name="assignee" id="assignee">
							<option disabled value="">Assignee</option>
							<option value="85416a6b-e075-4d85-914b-37b90f67d802">Grace Stone</option>
							<option value="c454b689-4168-4561-add9-8826e54e5bb8">Jhon Doe</option>
							<option value="501d3641-99a4-4618-8a0b-3010e5870302">Romeo Barnes</option>
							<option value="cdeeae1e-5da2-42b0-85ab-1806fac6223d">Brayan Vera Vera</option>
						</select>

						{/* TASK TAGS INPUT */}
						<div className="checkbox-container">
							<label><input
								type="checkbox"
								name="labels"
								id="labels"
								defaultChecked={false}
								onChange={handleCheckboxChange}
								value="ANDROID" />ANDROID</label>
							<label><input
								type="checkbox"
								name="labels"
								id="labels"
								defaultChecked={false}
								onChange={handleCheckboxChange}
								value="IOS" />IOS</label>
							<label><input
								type="checkbox"
								name="labels"
								id="labels"
								defaultChecked={false}
								onChange={handleCheckboxChange}
								value="NODE_JS" />NODE_JS</label>
							<label><input
								type="checkbox"
								name="labels"
								id="labels"
								defaultChecked={false}
								onChange={handleCheckboxChange}
								value="RAILS" />RAILS</label>
							<label><input
								type="checkbox"
								name="labels"
								id="labels"
								defaultChecked={false}
								onChange={handleCheckboxChange}
								value="REACT" />REACT</label>
						</div>

						{/* TASK STATUS INPUT */}
						<select onChange={(event) => { setStatus(event.target.value) }} className="selector" defaultValue="" required name="status" id="status">
							<option disabled value="">Status</option>
							<option value="BACKLOG">BACKLOG</option>
							<option value="CANCELLED">CANCELLED</option>
							<option value="DONE">DONE</option>
							<option value="IN_PROGRESS">IN_PROGRESS</option>
							<option value="TODO">TODO</option>
						</select>
						{/* TASK DATETIME INPUT */}
						<input required className="selector" defaultValue="" onChange={(event) => { setDueDate(event.target.value) }} type="datetime-local"></input>

					</div>
					<div className="buttons-container">
						<button className="button modal-cancel" onClick={closeModal}>Cancel</button>
						<button type="submit" className="button modal-submit">Create</button>
					</div>
				</form>
			</div>
		</article>
	);
}
export default Modal;