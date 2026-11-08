type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  location: string;
  details: string;
};

export function createCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.start}/${event.end}`,
    ctz: 'Asia/Kolkata',
    location: event.location,
    details: `${event.details}\n\nPlease set the Google Calendar notification to 1 hour before.`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
