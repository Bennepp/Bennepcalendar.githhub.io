const calendarGrid = document.querySelector('.calendar-grid');
const monthYearDisplay = document.getElementById('month-year');

let currentDate = new Date();


let events = {
    2024: { // Events for 2024
        10: { // November (Month 10)
            9: "New Year's Day",
            5: "Meeting with Bob",
        },
        2: { // March (Month 2)
            10: "Doctor Appointment",
            15: "Team Event",
        },
        4: { // May (Month 4)
            20: "Conference",
            25: "Birthday Party",
        },
    },
    2025: { // Events for 2025
        1: { // February (Month 1)
            14: "Valentine's Day Celebration",
            20: "Project Deadline",
        },
        8: { // September (Month 8)
            5: "Labor Day Weekend",
        },
    },
    // Add more years, months, and events as needed
};

function renderCalendar(date) {
    // Clear existing dates
    calendarGrid.innerHTML = 
        `<div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>`;

    const month = date.getMonth();
    const year = date.getFullYear();

    monthYearDisplay.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Add empty cells for days of the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        const emptyDate = document.createElement('div');
        emptyDate.classList.add('date', 'empty');
        emptyDate.innerHTML = `<span class="date-number">${daysInPrevMonth - i + 1}</span><div class="event-content"></div>`;
        calendarGrid.appendChild(emptyDate);
    }

    // Add cells for each day of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');

        // Check if there's an event for this date in the current year and month
        const eventText = events[year] && events[year][month] && events[year][month][i] 
                          ? events[year][month][i] 
                          : "";

        dateElement.innerHTML = `
            <span class="date-number">${i}</span>
            <div class="event-content">
                ${eventText}
            </div>`;
        calendarGrid.appendChild(dateElement);
    }

    // Fill the rest of the row with days from the next month
    const totalCells = firstDayOfMonth + daysInMonth;
    const extraCells = (7 - (totalCells % 7)) % 7;

    for (let i = 1; i <= extraCells; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.classList.add('date', 'empty');
        emptyDate.innerHTML = `<span class="date-number">${i}</span><div class="event-content"></div>`;
        calendarGrid.appendChild(emptyDate);
    }
}

// Function to change the month (previous or next)
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

// Initial render
renderCalendar(currentDate);
