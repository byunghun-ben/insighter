import { Event } from "../types";

const API_URL = "http://localhost:5001";

const getEvents = async (start: number = 0) => {
  const LIMIT = 10;
  const response = await fetch(`${API_URL}/events?_start=${start}&_limit=${LIMIT}`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();

  return {
    events,
    nextPage: start + LIMIT,
    hasMore: events.length === LIMIT,
  };
};

const addEvent = async (event: Event) => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to add event");
  }

  return response.json();
};

const editEvent = async (event: Event) => {
  const response = await fetch(`${API_URL}/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to edit event");
  }

  return response.json();
};

const deleteEvent = async (id: string) => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  return response.json();
};

const API = {
  getEvents,
  addEvent,
  editEvent,
  deleteEvent,
} as const;

export default API;
