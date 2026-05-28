/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Programs } from './components/Programs';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Component as Testimonials } from '@/components/ui/testimonial';
import { InfiniteGridBackground } from '@/components/ui/the-infinite-grid';
import { CursorTrailDot } from './components/ui/CursorTrailDot';

export default function App() {
  return (
    <div className="page-shell min-h-screen text-[var(--color-ink)]">
      <InfiniteGridBackground />
      <CursorTrailDot />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Programs />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
