import React from "react";
import {
	RiAlarmLine,
	RiMoreFill,
	RiAttachment2,
	RiNodeTree,
	RiChat3Line
} from "react-icons/ri";
import { DAY_MILLISECONDS } from '../utils/constanst'
import UserPic from '../images/userpic.png';
import "../stylesheets/TaskCard.css"

function TaskCard({
	name = "defaultname",
	points = "??",
	dueDate = "missingdate",
	tags = ["tag1", "tag2"],
	avatar = UserPic,
	assigneeName="defName" }) {

		// returns the remaining days until the goalDate
	const remainingDays = () => {
		const current = new Date();
		const goalDate = new Date(Date.parse(dueDate));
		const diffDays = Math.round((goalDate - current) / DAY_MILLISECONDS);
		const goalDateString = goalDate.toDateString().substring(goalDate.toDateString().indexOf(" ") + 1);
		// variable res return an array with remaining days, formatted goalDate, and css class
		let dateStyle = "";
		if (diffDays > 2) {
			dateStyle = "onTime";
		} else {
			if (diffDays > 0) {
				dateStyle = "nearTime";
			} else {
				dateStyle = "delayed";
			}
		}

		const res = [diffDays, goalDateString, dateStyle];
		return (res);
	}

	const pointsInNumber = () => {
		switch (points) {
			case "ZERO":
				return (0);

			case "ONE":
				return (1);

			case "TWO":
				return (2);

			case "FOUR":
				return (4);

			case "EIGHT":
				return (8);
			default:
				break;
		}
	}
	// const timeRemain=remainingDays();

	return (
		<div className="taskCard">

			<div className="taskCard__line line1">
				<h4>{name}</h4>
				<RiMoreFill className="options" />
			</div>

			<div className="taskCard__line line2">
				<p>
					{
						pointsInNumber() === 1 ?
							pointsInNumber() + " Point"
							:
							pointsInNumber() + " Points"
					}
				</p>
				<span className={`highlighted time ${remainingDays()[2]}`}>
					<RiAlarmLine className="clockIcon" />
					{
						remainingDays()[0] > 1 ?
							remainingDays()[1] //Date to String
							:
							remainingDays()[0] === 1 ?
								"LAST DAY"
								: "DELAYED"
					}
				</span>
			</div>

			<div className="taskCard__line line3">

				{/* tags PROP: Mapping each tag with its respective css class */}
				{
					tags.map(tag => {
						return (
							<span key={tag} className={`highlighted ${tag.toLowerCase()}`}>{tag}</span>
						);
					})

				}
			</div>

			<div className="taskCard__line line4">
				<img className="profilePic" src={avatar||UserPic} alt={`${assigneeName}`}></img>
				<RiAttachment2 />
				<RiNodeTree />
				<RiChat3Line />

			</div>
		</div>
	);
}
export default TaskCard;