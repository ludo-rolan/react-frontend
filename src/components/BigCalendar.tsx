'use client';

import React, {
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
  SyntheticEvent,
  MutableRefObject,
  useEffect
} from "react";
import { Calendar, Event, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);


const BigCalendar = ({ events }: {events: Event[]}) => {

  const counter: MutableRefObject<number> = useRef(0);
  const eventsWithIds: any = events.map((evt) => {
    updateCounter(); 
    console.log(counter.current);
    const currentCounter = counter.current;
    return { ...evt, id: currentCounter } 
  });

  function updateCounter ()
  {
    counter.current++;
  }

  const [myEvents, setMyEvents] = useState(eventsWithIds);

  const handleEventResize = useCallback(
    (
        { event, start, end }: any
    ) => {
        const updatedEvent = {...event, start, end};
        const updatedEvents = myEvents.map((ev: {id: number, title: string, start: Date, end: Date}) => 
            ev.title === updatedEvent.title ? updatedEvent : ev
        );
        setMyEvents(updatedEvents);
    },
    [myEvents, setMyEvents]
  );
  
  return (
    <>
      <div style={
          { 
            height: '500px',
            width: '1100px'
          }
        }
      >
        <DnDCalendar
          draggableAccessor={ () => true }
          events={eventsWithIds}
          localizer={localizer}
          onDragOver={(dragEvent: SyntheticEvent) => { return dragEvent.preventDefault()}}
          onDragStart={({ event, action, direction }) => { console.log(action) }}
          onEventDrop={({event, start, end}) => { 
            const evt = event as Event;
            evt.start = start as Date;
            evt.end = end as Date;
            return evt;
           }}
           onEventResize={({event, start, end}) => {
            const evt = event as Event;
            evt.start = start as Date;
            evt.end = end as Date;
            return evt;
           }}
        // onEventResize={handleEventResize}
           onSelectEvent={(event) => console.log((event as Event).title)}
          resizable={true}
          resizableAccessor={(event)  => true}
        />
      </div>
    </>
  );
}

export default BigCalendar;