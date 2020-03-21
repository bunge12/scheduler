import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

import "components/Appointment/style.scss";
import useVisualMode from "../../hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const interviewers = props.interviewers
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview).then(() => { transition(SHOW) })
  }

  const edit = () => {
    transition(EDIT)
  }
  const remove = () => {
    transition(CONFIRM)
  }
  const confirm = () => {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => { transition(EMPTY) })
  }

  return (
    <article className="appointment" id={props.id} key={props.id}>
      <Header time={props.time} />
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to do this???"
          onCancel={back}
          onConfirm={confirm}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}

          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onSave={save}
        />
      )}
    </article>
  )
}