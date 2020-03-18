import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

import "components/Appointment/style.scss";

export default function Appointment(props) {
  return (
    <article className="appointment" id={props.id} key={props.id}>
      <Header time={props.time} />
      {props.interview ?
        <Show
          interviewer={props.interview.interviewer}
          student={props.interview.student}
        /> : <Empty />}
    </article>
  )
}