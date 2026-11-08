'use client';

export function SangeetIntro({ guestName }: { guestName: string }) {
  return (
    <section className="sangeet-intro" aria-label="Sangeet invitation">
      <p className="sangeet-intro-label">A PERSONAL INVITATION TO</p>

      <h2 className="sangeet-guest-name">{guestName}</h2>

      <div className="champagne-glasses">
        <svg viewBox="0 0 320 260" fill="none">
          <g className="glass-left">
            <path
              d="M65 35 C65 100 82 120 110 125 C138 120 155 100 155 35"
              stroke="#aa8e5e"
              strokeWidth="2"
            />
            <path d="M68 70 Q110 80 152 70" stroke="#aa8e5e" opacity=".7" />
            <path d="M110 125 V205 M85 205 H135" stroke="#aa8e5e" strokeWidth="2" />
            <path
              d="M68 72 Q110 82 152 72 L148 88 Q110 100 72 88 Z"
              fill="#d9bd83"
              opacity=".55"
            />
          </g>

          <g className="glass-right">
            <path
              d="M165 35 C165 100 182 120 210 125 C238 120 255 100 255 35"
              stroke="#aa8e5e"
              strokeWidth="2"
            />
            <path d="M168 70 Q210 80 252 70" stroke="#aa8e5e" opacity=".7" />
            <path d="M210 125 V205 M185 205 H235" stroke="#aa8e5e" strokeWidth="2" />
            <path
              d="M168 72 Q210 82 252 72 L248 88 Q210 100 172 88 Z"
              fill="#d9bd83"
              opacity=".55"
            />
          </g>

          <g className="champagne-sparkles" stroke="#aa8e5e" strokeWidth="1.5">
            <path d="M160 10 V25 M153 17 H167" />
            <path d="M45 100 V112 M39 106 H51" />
            <path d="M275 100 V112 M269 106 H281" />
            <path d="M160 145 V157 M154 151 H166" />
          </g>
        </svg>
      </div>

      <h1 className="sangeet-intro-title">
        Here's to
        <br />
        <i>Seven Years & Forever.</i>
      </h1>

      <p className="sangeet-intro-description">
        Together with our families, we invite you to join us for an evening of music,
        dance and celebration at our Sangeet, followed by our wedding day. It wouldn't be
        the same without you!
      </p>

      <p className="sangeet-invitation-events">SANGEET NIGHT · WEDDING DAY</p>

      <span className="cover-bottom-note">WITH LOVE, PAVAN & ANUSHA</span>
    </section>
  );
}
