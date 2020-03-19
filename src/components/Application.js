import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList"
import Appointment from "./Appointment"
import getAppointmentsForDay from "../helpers/selectors"

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data }));
    });
  }, []);

  let appointments = getAppointmentsForDay(state, state.day || "Monday")

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
