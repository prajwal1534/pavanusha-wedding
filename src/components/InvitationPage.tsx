'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealOnScroll } from './RevealOnScroll';
import { ScratchSection } from './ScratchSection';
import { wedding } from '@/data/wedding';
import { SangeetSection } from '@/components/SangeetSection';
import { SangeetIntro } from '@/components/SangeetIntro';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, CalendarPlus } from 'lucide-react';
import { createCalendarUrl } from '@/lib/calendar';

export function InvitationPage({
  guestName,
  includeSangeet = false,
}: {
  guestName: string;
  includeSangeet?: boolean;
}) {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [playMusic, setPlayMusic] = useState<(() => Promise<void>) | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);

  const weddingCalendarUrl = createCalendarUrl({
    title: 'Wedding - Pavan & Anusha',
    start: '20261213T100000',
    end: '20261213T160000',
    location: `${wedding.venue}, ${wedding.address}, ${wedding.city}`,
    details: 'Join us to celebrate the wedding of Pavan & Anusha!',
  });

  const handleMusicReady = useCallback((play: () => Promise<void>) => {
    setPlayMusic(() => play);
  }, []);

  const handleOpenInvitation = () => {
    void playMusic?.();
    setInvitationOpened(true);
  };

  useEffect(() => {
    if (!invitationOpened) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-orbit',
        { rotate: -12, scale: 0.92 },
        {
          rotate: 8,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.to('.hero-wordmark', {
        yPercent: -24,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [invitationOpened]);

  return (
    <>
      <BackgroundMusic onReady={handleMusicReady} />

      {!invitationOpened && (
        <section className="invitation-cover" aria-label="Wedding invitation welcome">
          <div className="cover-content welcome-content">
            <p className="welcome-kicker">A PERSONAL INVITATION TO</p>

            <h2 className="welcome-guest">{guestName}</h2>

            <div className="welcome-divider">✦</div>

            <p className="welcome-eyebrow">TO CELEBRATE THE WEDDING OF</p>

            <h1 className="welcome-title">
              {wedding.partnerOne}
              <br />
              <i>&</i>
              <br />
              {wedding.partnerTwo}
            </h1>

            <p className="welcome-description">{wedding.invitationLine}</p>

            <button
              type="button"
              className="open-invitation-button"
              onClick={handleOpenInvitation}
            >
              OPEN INVITATION <span>↗</span>
            </button>

            <span className="welcome-footer">
              WITH LOVE, {wedding.partnerOne.toUpperCase()} &{' '}
              {wedding.partnerTwo.toUpperCase()}
              <br />
              HONORABLE MENTION : PRAJWAL
            </span>
          </div>
        </section>
      )}

      {invitationOpened && (
        <main>
          {includeSangeet && <SangeetIntro guestName={guestName} />}

          <section className="wedding-content">
            <header className="topbar">
              <p className="monogram">#pavANusha</p>
              <a href="#details" className="topbar-link">
                THE CELEBRATION <ArrowUpRight size={14} />
              </a>
            </header>

            <section className="hero" id="top" ref={heroRef}>
              <div className="hero-grain" />

              <div className="hero-center">
                <div className="guest-intro">
                  <p className="guest-label">A PERSONAL INVITATION TO</p>
                  <h2 className="guest-name">{guestName}</h2>
                </div>

                <div className="hero-orbit" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <p className="hero-eyebrow">A NEW CHAPTER BEGINS</p>

                <h1 className="hero-wordmark">
                  {wedding.partnerOne}
                  <br />
                  <i>&</i>
                  <br />
                  {wedding.partnerTwo}
                </h1>

                <p className="hero-subtitle">
                  {includeSangeet
                    ? 'Together with our families, we invite you to celebrate our wedding and Sangeet.'
                    : wedding.invitationLine}
                </p>

                <a className="scroll-cue" href="#story">
                  <span>SCROLL TO EXPLORE</span>
                  <ArrowDown size={15} />
                </a>
              </div>
            </section>

            {includeSangeet && (

            <section className="section story-section" id="story">
              <RevealOnScroll>
                <div className="section-kicker">01 / A little about us</div>
              </RevealOnScroll>

              <div className="story-layout">
                <RevealOnScroll className="story-title-wrap">
                  <h2 className="section-heading">
                    Seven years, countless memories, and a love that has only
                    <br />
                    <em>grown stronger.</em>
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.15} className="story-text-wrap">
                  <p className="story-text">{wedding.story}</p>
                  <span className="signature">
                    With love, {wedding.partnerOne} & {wedding.partnerTwo}
                  </span>
                </RevealOnScroll>
              </div>

              <RevealOnScroll className="photo-placeholder">
                <Image
                  src="/images/pavanusha.jpeg"
                  alt={`${wedding.partnerOne} and ${wedding.partnerTwo}`}
                  width={1400}
                  height={1000}
                  className="couple-photo"
                />
                <span className="photo-caption font-extrabold">
                  A moment worth keeping
                </span>
              </RevealOnScroll>
            </section>)}

            <section className="rocky-section">
              <div className="rocky-content">
                <p className="section-kicker">A SPECIAL MESSAGE FROM OUR LITTLE ONE</p>

                <h2 className="rocky-title">
                  Rocky says
                  <br />
                  <em>You're Invited!</em>
                </h2>

                <div className="rocky-photo">
                  <Image
                    src="/images/rocky.jpeg"
                    alt="Rocky, the four-legged member of the family"
                    width={700}
                    height={850}
                    className="rocky-image"
                  />
                </div>

                <p className="rocky-message">
                  My hoomans are getting married!
                  <br />
                  I've been wagging my tail waiting for this day.
                  <br />
                  Come celebrate with us!
                </p>

                <span className="rocky-signature">Lots of woofs, Rocky 🐾</span>
              </div>
            </section>

            <section className="interlude">
              <RevealOnScroll>
                <p>
                  “The best things in life are better
                  <br />
                  when shared with the people we love.”
                </p>
                <span>— A NOTE FROM US</span>
              </RevealOnScroll>
            </section>
{includeSangeet && <SangeetSection />}
            <ScratchSection />

            <section className="section details-section" id="details">
              <RevealOnScroll>
                <div className="section-kicker">02 / The celebration</div>
                <h2 className="section-heading">
                  The day we’ve
                  <br />
                  <em>been waiting for.</em>
                </h2>
              </RevealOnScroll>

              <div className="details-card">
                <RevealOnScroll>
                  <div className="detail-date">
                    <span>{wedding.weekday}</span>
                    <strong>{wedding.date}</strong>
                    <span className="pt-2">
                      {wedding.month} {wedding.year}
                    </span>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.12}>
                  <div className="detail-divider" />

                  <div className="detail-venue">
                    <span className="detail-label">THE VENUE</span>
                    <h3>{wedding.venue}</h3>
                    <p>
                      {wedding.address}
                      <br />
                      {wedding.city}
                    </p>

                    <span className="detail-time">{wedding.ceremonyTime}</span>

                    <a
                      className="text-link"
                      href={wedding.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={15} /> GET DIRECTIONS <ArrowUpRight size={14} />
                    </a>
                    <a
                      className="calendar-reminder-button"
                      href={weddingCalendarUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CalendarPlus size={15} />
                      SET WEDDING REMINDER
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            

            <footer className="footer">
              <p className="section-kicker">WITH LOVE & JOY</p>
              <h2>
                {wedding.partnerOne} <i>&</i> {wedding.partnerTwo}
              </h2>
              <p>We hope to see you there.</p>
              <a href="#top" className="back-top">
                BACK TO TOP ↑
              </a>
            </footer>
          </section>
        </main>
      )}
    </>
  );
}
