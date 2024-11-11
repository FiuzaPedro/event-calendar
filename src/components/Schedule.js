import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import '../css/schedulestyles.css';
// import CustomCalendar from './CustomCalendar';
import barragem from '../img/barragemStaClara.jpg';

export default function Schedule(props) {
    // const [page, setPage] = useState();    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let weekDayName, dayTxt;
    function getDayName(day) {
        switch (day) {
            case 0: weekDayName = "Sunday";
                return weekDayName;
            case 1: weekDayName = "Monday";
                return weekDayName;
            case 2: weekDayName = "Tuesday";
                return weekDayName;
            case 3: weekDayName = "Wednesday";
                return weekDayName;
            case 4: weekDayName = "Thursday";
                return weekDayName;
            case 5: weekDayName = "Friday";
                return weekDayName;
            case 6: weekDayName = "Saturday";
                return weekDayName;
            default:
                break;
        }
    } // end getDayName function
    function getDayTxt(monthDay) {
        switch (monthDay) {
            case 1:
                dayTxt = 'st';
                return dayTxt;
            case 2:
                dayTxt = 'nd';
                return dayTxt;
            case 3:
                dayTxt = 'rd';
                return dayTxt;

            default:
                dayTxt = 'th';
                return dayTxt;
        }
    }
    return (
        <div className='scheduleWrapper'>
            {/* {page === 'show_calendar' && <CustomCalendar />} */}
            {/* <Button className='' variant="primary" onClick={() => setPage('show_calendar')}>Back</Button> */}

            <h1>Schedule</h1>
            <Button className=' btnBack' variant='danger'>
                <Link className={'btns'} to="/">Back</Link>
            </Button>
            <ul className='ulEvents'>
                {(props.events.length === 0) ? <h2 className='noEventsText'>No Events Yet</h2> : ''}
                {props.events.map((value) =>
                    <li className='liEvents' key={value.id}>
                        <img src={barragem} alt={value.title} />
                        <h3 className='eventTitle'><span>{value.title}</span></h3>
                        <div className="dateWrapper">
                            <span> {getDayName(new Date(value.date).getDay())}</span>
                            <span> {new Date(value.date).getDate()}</span>
                            <span>{getDayTxt(new Date(value.date).getDate())} {months[new Date(value.date).getMonth()]}</span>
                            <span> of {new Date(value.date).getFullYear()}</span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}