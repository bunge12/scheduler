export default function getAppointmentsForDay(state, day) {
  const result = [];
  const fnState = { ...state }
  const found = { ...fnState.days.find(element => element.name === day) }

  if (typeof found.appointments === 'undefined') {
    return [];
  } else {
    found.appointments.forEach(appt => {
      if (fnState.appointments[appt]) { result.push(fnState.appointments[appt]) }
    })
  }
  return result;
}

export const getInterviewersForDay = (state, day) => {
  const result = [];
  const fnState = { ...state }
  const found = { ...fnState.days.find(element => element.name === day) }

  if (typeof found.interviewers === 'undefined') {
    return [];
  } else {
    found.interviewers.forEach(person => {
      if (fnState.interviewers[person]) { result.push(fnState.interviewers[person]) }
    })
  }
  return result;
}

export const getInterview = (state, interview) => {


  if (interview) {

    return ({
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      },
      student: interview.student
    })
  }
  else return null;
}