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
        <div className="invitation-parents">
          <div className="invitation-parents-row">
            <span className="invitation-parents-names">이환 · 정종희</span>
            <span className="invitation-parents-relation">의 아들</span>
            <span className="invitation-parents-person">준희</span>
          </div>
          <div className="invitation-parents-row">
            <span className="invitation-parents-names">양영옥 · 노희숙</span>
            <span className="invitation-parents-relation">의 딸</span>
            <span className="invitation-parents-person">예인</span>
          </div>
        </div>
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
