export default function getAppointmentsForDay(state, day) {
  const found = state.days.find((element) => element.name === day);
  return found
    ? found.appointments.map((appt) => state.appointments[appt])
    : [];
}

export const getInterviewersForDay = (state, day) => {
  const found = state.days.find((element) => element.name === day);
  return found
    ? found.interviewers.map((person) => state.interviewers[person])
    : [];
};

export const getInterview = (state, interview) => {
  if (interview) {
    const path = state.interviewers[interview.interviewer];

    return {
      interviewer: {
        id: interview.interviewer,
        name: path.name,
        avatar: path.avatar,
      },
      student: interview.student,
    };
  } else return null;
};
