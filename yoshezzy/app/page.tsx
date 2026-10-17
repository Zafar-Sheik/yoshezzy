import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Roots from '@/components/Roots';
import Stats from '@/components/Stats';
import Roles from '@/components/Roles';
import Services from '@/components/Services';
import Apparel from '@/components/Apparel';
import Press from '@/components/Press';
import Socials from '@/components/Socials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee items={['Watkine, Booooi!', 'Durban to the world', 'Real. Raw. Relatable.', 'Influencer', 'Model', 'Baller', 'Artist']} />
        <About />
        <Roots />
        <Stats />
        <Roles />
        <Marquee tone="cream" tilt={2} reverse items={['Bookings open', 'Brand collabs', 'Events', 'Shoots', 'Campaigns']} />
        <Services />
        <Apparel />
        <Press />
        <Socials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
