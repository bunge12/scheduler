import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');


export default function InterviewerListItem(props) {

  let itemClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  })

  return (
    <li
      id={props.id}
      className={itemClass}
      selected={props.selected}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}