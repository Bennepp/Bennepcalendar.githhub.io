const calendarGrid = document.querySelector('.calendar-grid');
const monthYearDisplay = document.getElementById('month-year');

let currentDate = new Date();

let events = {
    2024: { // Year 2024
        10: { // Nov (month 10) (sorry its like this LOL)
            9: "BOD Meeting", // Day 9
            5: "Meeting with Bob",
        },
        2: {
            10: "Doctor Appointment",
            15: "Team Event",
        },
        4: {
            20: "Conference",
            25: "Birthday Party",
        },
    },
    2025: {
        1: {
            14: "Valentine's Day Celebration",
            20: "Project Deadline",
        },
        8: {
            5: "Labor Day Weekend",
        },
    },
};

function renderCalendar(date) {
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

    for (let i = firstDayOfMonth; i > 0; i--) {
        const emptyDate = document.createElement('div');
        emptyDate.classList.add('date', 'empty');
        emptyDate.innerHTML = `<span class="date-number">${daysInPrevMonth - i + 1}</span><div class="event-content"></div>`;
        calendarGrid.appendChild(emptyDate);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('date');

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

    const totalCells = firstDayOfMonth + daysInMonth;
    const extraCells = (7 - (totalCells % 7)) % 7;

    for (let i = 1; i <= extraCells; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.classList.add('date', 'empty');
        emptyDate.innerHTML = `<span class="date-number">${i}</span><div class="event-content"></div>`;
        calendarGrid.appendChild(emptyDate);
    }

    // checks if DarkMode is true, when rendering next month if it is, it keeps the styling instead of reverting to light mode and looking strange lol
    if (document.body.classList.contains('dark-mode')) {
        document.querySelectorAll('.date').forEach(date => date.classList.add('dark-mode'));
        document.querySelectorAll('.event-content').forEach(event => event.classList.add('dark-mode'));
    }
}

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.calendar').classList.toggle('dark-mode');
    document.querySelector('.calendar-header').classList.toggle('dark-mode');
    document.querySelectorAll('.PNButton').forEach(button => {
        button.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.date').forEach(date => {
        date.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.event-content').forEach(event => {
        event.classList.toggle('dark-mode');
    });
    document.querySelector('.tooltip').classList.toggle('dark-mode');
});

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

// Initial render
renderCalendar(currentDate);
