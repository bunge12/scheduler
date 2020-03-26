import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/style.scss";
import useVisualMode from "../../hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const interviewers = props.interviewers;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const edit = () => {
    transition(EDIT);
  };
  const remove = () => {
    transition(CONFIRM);
  };
  const confirm = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article
      className="appointment"
      id={props.id}
      key={props.id}
      data-testid="appointment"
    >
      <Header time={props.time} />
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting..." onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error SAVING..." onClose={back} />
      )}
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
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onSave={save}
        />
      )}
    </article>
  );
}
