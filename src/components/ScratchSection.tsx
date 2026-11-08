'use client';

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { wedding } from '@/data/wedding';
import { ScratchCard } from './ScratchCard';
import { motion, useReducedMotion } from 'motion/react';

export function ScratchSection() {
  const [revealed, setRevealed] = useState([false, false, false]);
  const celebrated = useRef(false);
  const allRevealed = revealed.every(Boolean);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!allRevealed || celebrated.current || reduceMotion) return;
    celebrated.current = true;
    const end = Date.now() + 1500;
    const colors = ['#b89b68', '#e7d8b8', '#8f7750', '#f7f2e8'];
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 65, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 65, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [allRevealed, reduceMotion]);

  const markRevealed = (index: number) => {
    setRevealed((current) => current.map((value, i) => (i === index ? true : value)));
  };

  return (
    <section className="section scratch-section" id="reveal">
      <div className="section-kicker">A little surprise</div>
      <h2 className="section-heading">
        Three little secrets.
        <br />
        <em>One beautiful day.</em>
      </h2>
      <p className="section-copy">
        Scratch each circle to uncover the date. Your invitation is waiting underneath.
      </p>
      <div className="scratch-grid">
        <ScratchCard
          value={wedding.date}
          label="Date"
          revealed={revealed[0]}
          onReveal={() => markRevealed(0)}
        />
        <ScratchCard
          value={wedding.month}
          label="Month"
          revealed={revealed[1]}
          onReveal={() => markRevealed(1)}
        />
        <ScratchCard
          value={wedding.year}
          label="Year"
          revealed={revealed[2]}
          onReveal={() => markRevealed(2)}
        />
      </div>
      {allRevealed ? (
        <motion.div
          className="announcement"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="announcement-rule" />
          <p className="section-kicker">Save the date</p>
          <h3>
            {wedding.partnerOne} <span>&</span> {wedding.partnerTwo}
          </h3>
          <p className="announcement-date">
            {wedding.weekday}, {wedding.date} {wedding.month} {wedding.year}
          </p>
          <p className="announcement-note">We can’t wait to celebrate with you.</p>
          <div className="announcement-rule" />
        </motion.div>
      ) : (
        <p className="scratch-progress">
          {revealed.filter(Boolean).length} of 3 revealed
        </p>
      )}
    </section>
  );
}
