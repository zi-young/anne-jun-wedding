import { weddingData } from '@/data/wedding';

export default function InvitationText() {
  const { invitation, date, venue } = weddingData;

  return (
    <section className="invitation-section">
      <div className="invitation-content">
        <h2 className="invitation-heading">You&apos;re Invited!</h2>
        {invitation.map((paragraph, idx) => (
          <p key={idx} className="invitation-paragraph">
            {paragraph}
          </p>
        ))}
        <div className="invitation-date-info">
          <p className="invitation-date-line">
            {date.year}년 {date.month}월 {date.day}일 {date.dayOfWeek}
          </p>
          <p className="invitation-date-sub">
            {date.time} · {venue.name}
          </p>
        </div>
      </div>
    </section>
  );
}
