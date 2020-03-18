import React from "react";

import "components/InterviewList.scss";
import InterviewListItem from "./InterviewerListItem";

export default function InterviewList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(person => {
          return (
            <InterviewListItem
              key={person.id}
              name={person.name}
              avatar={person.avatar}
              selected={person.id === props.interviewer}
              setInterviewer={event => props.setInterviewer(person.id)}
            />
          )
        })}
      </ul>
    </section>
  )

}