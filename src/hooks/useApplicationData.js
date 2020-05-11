import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        day: "Monday",
        days: all[0].data,
        interviewers: all[2].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      state.days.forEach((item) => {
        const arr = item.appointments;
        const appt = state.appointments[id].id;
        const found = arr.find((element) => element === appt);
        if (typeof found !== "undefined") {
          // console.log();
          const x = item.id - 1;
          const newSpots = !state.appointments[id].interview
            ? state.days[x].spots - 1
            : state.days[x].spots;
          const day = {
            ...state.days[x],
            spots: newSpots,
          };
          const days = [...state.days];
          days[x] = day;
          setState((prev) => ({ ...state, appointments, days }));
        }
      });
    });
  };
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      state.days.forEach((item) => {
        const arr = item.appointments;
        const appt = state.appointments[id].id;
        const found = arr.find((element) => element === appt);
        if (typeof found !== "undefined") {
          const x = item.id - 1;
          const newSpots = state.days[x].spots + 1;
          const day = {
            ...state.days[x],
            spots: newSpots,
          };
          const days = [...state.days];
          days[x] = day;
          setState((prev) => ({ ...state, appointments, days }));
        }
      });
    });
  };

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
