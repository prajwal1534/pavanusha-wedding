# Wedding Invitation Starter

A single-page, modern editorial wedding invitation built with Next.js, React, TypeScript, Tailwind CSS, Motion, GSAP ScrollTrigger, HTML Canvas and canvas-confetti.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalise the invitation

Edit `src/data/wedding.ts` first. Replace the sample names, date, venue, address, story and Google Maps link.

## Replace the photo placeholder

Add your image to `public/images/` and replace the `.photo-placeholder` block in `src/components/InvitationPage.tsx` with a Next.js `<Image>` or regular `<img>` element. Add the corresponding image styling in `src/app/globals.css`.

## Main components

- `InvitationPage.tsx`: page composition and GSAP scroll effects.
- `RevealOnScroll.tsx`: reusable in-view entrance animation.
- `ScratchCard.tsx`: reusable pointer/touch scratch surface with a tap-to-reveal fallback.
- `ScratchSection.tsx`: tracks all three reveals and launches confetti once.

## Before publishing

- Replace all placeholder wedding details and the placeholder photo.
- Confirm the date, weekday, venue and map link.
- Test scratching on iOS and Android devices, including a smaller phone.
- Add real RSVP handling only if you need to collect guest responses.
- Check image licensing and optimise large photos.

The sample date and names are fictional placeholders.
