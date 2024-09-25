class Card {
  constructor() {
    this.types = {
      vertical: 0,
      horizontal: 1,
      mobile: 2,
    };

    this.filters = {
      date: new Set(),
      type: new Set(),
      distance: new Set(),
      category: new Set(),
    };

    for (let event of eventsStore) {
      this.filters.date.add(event.date);
      this.filters.type.add(event.type);
      this.filters.distance.add(event.distance);
      this.filters.category.add(event.category);
    }

    this.type = -1;
    this.appliedFilters = {};
  }
}

class CardsManipulator {
  getHTML(templateCard) {
    let html = "";

    const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    for (let event of eventsStore) {
      let weekday = weekdays[event.date.getUTCDay()];
      let month = months[event.date.getUTCMonth()];
      let day = event.date.getUTCDate();

      let appendLeadingZero = (num) => (num < 10 ? "0" + num : num);
      let time = `${event.date.getUTCHours()}:${appendLeadingZero(
        event.date.getUTCMinutes()
      )}`;

      let date = `${weekday}, ${month} ${day} • ${time} UTC`;

      let card = null;
      switch (templateCard.type) {
        case templateCard.types.vertical:
          card = `
          <div class="v-card">
            <div class="cover" style="background-image: url('${
              event.image
            }'); background-size: cover;">
              ${
                event.type === "online"
                  ? '<p class="type"><img src="/assets/images/icons/Camera.svg"> Online Event</p>'
                  : ""
              }
            </div>
            <div class="info">
              <h4>${event.title}</h4>
              <p class="category">${event.category} (${event.distance} km)</p>
              <p class="date"><img src="/assets/images/icons/Calendar.svg" alt="Calendar"> ${date}</p>
              <div style="display: flex;">
                <span class="attendees">${
                  event.attendees
                    ? '<img src="/assets/images/icons/CheckMark.svg" alt="CheckMark">'
                    : ""
                } ${event.attendees ? event.attendees : ""} ${
            event.attendees ? "attendees" : ""
          }</span>
                <span class="cost" ${
                  event.attendees ? "style='margin-left: 16px;'" : ""
                }><img src="/assets/images/icons/Ticket.svg" alt="Ticket"> Free</span>
              </div>
            </div>
          </div>
          `;
          break;
        case templateCard.types.horizontal:
          card = `
          <div class="h-card">
              <img src="${event.image}" alt="cover">
              <div class="info">
                  <p class="date">${date}</p>
                  <h4>${event.title}</h4>
                  <p class="category">${event.category} (${
            event.distance
          } km)</p>
                  <p class="attendees">${
                    event.attendees ? event.attendees : ""
                  } ${event.attendees ? "attendees" : ""}</p>
              </div>
          </div>
          `;
          break;
        case templateCard.types.mobile:
          card = `
          <div class="m-card">
              <img src="${event.image}" alt="cover">
              <div class="info">
                  <p id="date">${date}</p>
                  <h4>${event.title}</h4>
                  <p id="category">${event.category}</p>
                  <p id="type">${
                    event.type === "online"
                      ? "<img src='/assets/images/icons/Camera.svg'> Online Event"
                      : ""
                  }</p>
                  <p id="attendees">${event.attendees ? event.attendees : ""} ${
            event.attendees ? "attendees" : ""
          }</p>
              </div>
          </div>
          `;
          break;
        default:
          throw new Error("Invalid card type");
      }

      if (Object.keys(templateCard.appliedFilters).length === 0) {
        html += card;
        continue;
      }

      for (let i in templateCard.appliedFilters) {
        if (templateCard.appliedFilters[i] != event[i]) {
          continue;
        }

        html += card;
      }
    }

    return html;
  }
}
