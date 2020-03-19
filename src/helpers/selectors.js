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
