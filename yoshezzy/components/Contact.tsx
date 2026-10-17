'use client';

import { FormEvent, useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { site } from '@/lib/data';

const budgets = ['Under R10k', 'R10k – R30k', 'R30k – R75k', 'R75k+', 'Not sure yet'];
const kinds = ['Sponsored content', 'Ambassador', 'Event / appearance', 'Modelling / acting', 'Something else'];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(root.current!.querySelector('.contact-title')!, { type: 'chars', mask: 'chars' });
      gsap.from(split.chars, {
        yPercent: 110,
        stagger: 0.025,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-title', start: 'top 80%' },
      });
      gsap.from('.contact-form > *', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      });
    },
    { scope: root },
  );

  // No backend needed: compose a tidy email in the visitor's mail app.
  // Swap for a form service (Formspree, Resend, etc.) when ready.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Booking enquiry — ${f.get('brand') || f.get('name')}`;
    const body = [
      `Name: ${f.get('name')}`,
      `Brand / company: ${f.get('brand')}`,
      `Email: ${f.get('email')}`,
      `Type of work: ${f.get('kind')}`,
      `Budget: ${f.get('budget')}`,
      '',
      `${f.get('message')}`,
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={root} className="contact section" id="contact">
      <p className="eyebrow">
        <span>09</span> Bookings &amp; collabs
      </p>
      <h2 className="contact-title">Let&apos;s go viral.</h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p>Brand campaigns, events, shoots or a collab idea — send the brief and Shezzy&apos;s team will come back to you.</p>
          <a className="contact-email" href={`mailto:${site.email}`} data-cursor="Email">
            {site.email}
          </a>
          <p className="contact-loc">Based in {site.city} · Available nationwide</p>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            <span>Your name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            <span>Brand / company</span>
            <input name="brand" autoComplete="organization" />
          </label>
          <label className="full">
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <fieldset className="full">
            <legend>What are we making?</legend>
            <div className="chips">
              {kinds.map((k, i) => (
                <label key={k} className="chip">
                  <input type="radio" name="kind" value={k} defaultChecked={i === 0} />
                  <span>{k}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="full">
            <legend>Budget</legend>
            <div className="chips">
              {budgets.map((b, i) => (
                <label key={b} className="chip">
                  <input type="radio" name="budget" value={b} defaultChecked={i === budgets.length - 1} />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="full">
            <span>The idea</span>
            <textarea name="message" rows={4} required />
          </label>
          <button className="btn btn--solid full" type="submit" data-cursor="Send">
            Send the brief →
          </button>
        </form>
      </div>
    </section>
  );
}
