import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, interviewers: all[2].data, appointments: all[1].data }));
    });
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {

        setState({ ...state, appointments });
      })

  }
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(state.days[0].spots + 1)
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {

        setState({ ...state, appointments });
      })
  }


  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }
}