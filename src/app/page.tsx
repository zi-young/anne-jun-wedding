import HeroSection from '@/components/HeroSection';
import InvitationText from '@/components/InvitationText';
import Countdown from '@/components/Countdown';
import Gallery from '@/components/Gallery';
import AccountAccordion from '@/components/AccountAccordion';
import MapLinks from '@/components/MapLinks';
import KakaoShare from '@/components/KakaoShare';
import ScrollObserver from '@/components/ScrollObserver';
import { ToastProvider } from '@/components/Toast';

export default function Home() {
  return (
    <ToastProvider>
      <ScrollObserver />
      <div className="wedding-container">
        <HeroSection />
        <InvitationText />
        <Countdown />
        <Gallery />
        <AccountAccordion />
        <MapLinks />
        <KakaoShare />
        <footer className="wedding-footer">
          <p className="footer-text">ANNE &amp; JUN</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
