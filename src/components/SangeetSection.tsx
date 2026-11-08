import { ArrowUpRight, MapPin, Music2, Sparkles, CalendarPlus } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { createCalendarUrl } from '@/lib/calendar';

export function SangeetSection() {
  const { sangeet } = wedding;

  const sangeetCalendarUrl = createCalendarUrl({
    title: 'Sangeet - Pavan & Anusha',
    start: '20261211T170000',
    end: '20261211T230000',
    location: `${wedding.venue}, ${wedding.address}, ${wedding.city}`,
    details: 'Join us for the Sangeet celebration of Pavan & Anusha!',
  });

  return (
    <section className="sangeet-section" id="sangeet">
      <div className="sangeet-topline">
        <span>THE CELEBRATION CONTINUES</span>
        <span>AN EVENING OF MUSIC & JOY</span>
      </div>

      <div className="sangeet-content">
        <p className="sangeet-eyebrow">
          <Sparkles size={14} strokeWidth={1.5} />
          THE NIGHT BEFORE FOREVER
        </p>

        <h2 className="sangeet-title">
          A Night
          <br />
          <i>to Remember.</i>
        </h2>

        <p className="sangeet-description">{sangeet.description}</p>

        <div className="sangeet-highlights">
          <div>
            <Music2 size={20} strokeWidth={1.4} />
            <span>Music & Dance</span>
          </div>
          <div>
            <Sparkles size={20} strokeWidth={1.4} />
            <span>Games & Surprises</span>
          </div>
          <div>
            <span className="sangeet-dress-icon">✳</span>
            <span>Dress Up & Celebrate</span>
          </div>
        </div>

        <div className="sangeet-details">
          <div className="sangeet-detail">
            <span className="sangeet-detail-label">DATE</span>
            <span>{sangeet.date}</span>
          </div>

          <div className="sangeet-detail">
            <span className="sangeet-detail-label">TIME</span>
            <span>{sangeet.time}</span>
          </div>

          <div className="sangeet-detail sangeet-detail-venue">
            <span className="sangeet-detail-label">VENUE</span>
            <span>{sangeet.venue}</span>
            {sangeet.address && <span>{sangeet.address}</span>}
            {sangeet.mapsUrl && (
              <a href={sangeet.mapsUrl} target="_blank" rel="noreferrer">
                GET DIRECTIONS <ArrowUpRight size={13} />
              </a>
            )}
            <a
              className="calendar-reminder-button"
              href={sangeetCalendarUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarPlus size={15} />
              SET SANGEET REMINDER
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <p className="sangeet-dress-note">
          THE DRESS CODE
          <br />
          <strong>Dress to impress. Come ready to dance.</strong>
        </p>
      </div>

      <div className="sangeet-bottomline">
        <span>GOOD MUSIC. GREAT COMPANY.</span>
        <span>LET'S MAKE MEMORIES</span>
      </div>
    </section>
  );
}
