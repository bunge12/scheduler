import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList"
import Appointment from "./Appointment"
import getAppointmentsForDay from "../helpers/selectors"

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Someone Student",
      interviewer: {
        id: 2,
        name: "Not Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    // axios.get("/api/days").then(response => /* setDays(response.data) */ response);
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second


      setState(prev => ({ days: all[0].data, appointments: all[1].data }));


    });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {
          appointments.map(appointment => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            )
          })
        }
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
