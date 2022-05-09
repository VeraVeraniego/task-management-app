//unused file

import React from "react";
import { useForm } from "react-hook-form";



const FormHook = () => {
	const { register, errors, handleSubmit } = useForm();

	const onSubmit = (data, e) => {
		console.log(data);
		e.target.reset();
	}

	const onCancel = () => {

	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				name="title"
				className="taskTitle"
				placeholder="Task Title"
				{
				...register('name')
				} />

			<div className="buttons-container">
				<button className="button modal-cancel" onClick={onCancel}>Cancel</button>
				<button type="submit" className="button modal-submit">Create</button>
			</div>
		</form>
	);
}
export default FormHook;