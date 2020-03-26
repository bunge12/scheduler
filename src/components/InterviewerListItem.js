import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require("classnames");

export default function InterviewerListItem(props) {
  let itemClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      key={props.id}
      className={itemClass}
      selected={props.selected}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
