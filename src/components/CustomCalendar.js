import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { Modal, Button, Form } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Schedule from './Schedule';
import $ from "jquery";
import '../css/calendarstyles.css';

var nextId = 0;
var eventId;

export default function CustomCalendar() {
    const [show, setShow] = useState(false);
    const [currentTxt, setCurrentTxt] = useState();
    // const [page, setPage] = useState();
    var dateToCreateEvent;
    const [events, setEvents] = useState([])

    const getSelectedDate = (info) => {
        dateToCreateEvent = info.startStr
        return dateToCreateEvent
    }
    const createEvent = () => {
        let eventinfo = window.prompt("Choose a name for the event please", "Event description");

        if (eventinfo === '' || eventinfo === null) {
            alert('No Description added, please insert some text to describe the event')
            return;
        };

        setEvents([
            ...events,
            {
                id: nextId++,
                title: eventinfo,
                date: dateToCreateEvent
            }
        ])

    }

    const handleShow = (e) => {
        eventId = e.event.id;
        setCurrentTxt(e.el.innerText);
        setShow(true);
        return eventId;
    };

    const handleClose = () => setShow(false);

    const handleTextChange = () => {
        // console.log(events[eventId].id);
        const updatedEvent = { ...events[eventId], title: document.getElementById('currentTxt').value };
        const newEvents = [...events];
        newEvents[eventId] = updatedEvent;
        setEvents(newEvents);
        handleClose();
    }

    const handleDelete = () => {
        // let index = events[eventId].id;
        let index = eventId;

        // setEvents(prevEvents => { return prevEvents.filter(i => console.log("i.id" + i.id + "\nIndex: " + index)) });
        setEvents(prevEvents => { return prevEvents.filter(i => i.id != index) }); //  funciona apenas sem o strictly equal..

        handleClose();
    }

    return (

        <div className='contentWrapper'>
            {/* {page === 'show_schedule' && <Schedule events={events} />} */}
            <div className="btnWrapper">
                <Button className='' variant="primary" onClick={createEvent}>Create Event</Button> &nbsp;
                {/* <Button className='' variant="warning" onClick={() => setPage('show_schedule')}>Print Event Schedule</Button> */}
                <Router>
                    <Button variant='secondary'>
                        <Link className='btns' to={{ pathname: "schedule", state: events }}>Print Event Schedule</Link>
                    </Button>
                    <Routes>
                        <Route exact path="/" component={CustomCalendar} />
                        <Route path='/schedule' element={<Schedule events={events} />} exact />
                    </Routes>
                </Router>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                weekends={true}
                selectable={true}
                height={"600px"}
                droppable={true}
                select={getSelectedDate}
                events={events}
                eventClick={handleShow}
                longPressDelay={0}
            />
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Current Event Description   </Form.Label>
                    <Form.Control
                        id={'currentTxt'}
                        type="text"
                        defaultValue={currentTxt}
                    //onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <h2>{ }</h2>
                    <div className="d-flex flex-row btn-group justify-content-space-between">
                        <Button className='' variant="primary" onClick={handleTextChange}>Change Description</Button>
                        <Button className='' variant='danger' onClick={handleDelete}>Delete Event</Button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close Modal</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}