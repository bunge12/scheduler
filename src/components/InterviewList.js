import React from "react";
import PropTypes from "prop-types";
import "components/InterviewList.scss";
import InterviewListItem from "./InterviewerListItem";

InterviewList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(value => {
          return (
            <InterviewListItem
              key={value.id}
              name={value.name}
              avatar={value.avatar}
              selected={value.id === props.value}
              setInterviewer={event => {
                props.onChange(value.id);
              }}
            />
          );
        })}
      </ul>
    </section>
  );
}
