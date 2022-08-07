import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActive,
  eventSetActive,
  eventStartLoading,
} from "../../actions/event";
import AddNewBtn from "../ui/AddNewBtn";
import DeleteBtn from "../ui/DeleteBtn";

// localizer
const localizer = momentLocalizer(moment);

// calender screen
const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { calendar, auth, ui } = useSelector((state) => state);
  const { events, activeEvent } = calendar;
  const { id } = auth;
  const { modalOpen } = ui;
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  
  useEffect(() => {
    // event start loading
    dispatch(eventStartLoading());
  }, [dispatch]);

  // on double click
  const onDoubleClick = (e) => {

    dispatch(uiOpenModal());
  };

  // on select
  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  // on view change
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  // onselect slot
  const onSelectSlot = (e) => {
    activeEvent && dispatch(eventClearActive());
    if (e.action === "select" || e.action === "doubleClick") {
      dispatch(
        eventSetActive({
          title: "",
          notes: "",
          start: e.start,
          end: e.end,
        })
      );
      dispatch(uiOpenModal());
    }
  };

  // event style getter
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: id === event.user._id ? "#367CF7" : "#465660",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return { style };
  };

  return (
    <div className="calendar">
      <Navbar />
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{ event: CalendarEvent }}
        />
      </div>
      {activeEvent && !modalOpen && <DeleteBtn />}
      <AddNewBtn />
      <CalendarModal />
    </div>
  );
};
export default CalendarScreen;
