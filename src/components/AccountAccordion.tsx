'use client';

import { useState } from 'react';
import { weddingData } from '@/data/wedding';
import { useToast } from './Toast';

interface Account {
  bank: string;
  number: string;
  owner: string;
}

function AccordionItem({ title, accounts }: { title: string; accounts: Account[] }) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async (account: Account) => {
    try {
      await navigator.clipboard.writeText(account.number);
      showToast(`${account.owner}님 계좌번호가 복사되었습니다`);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = account.number;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(`${account.owner}님 계좌번호가 복사되었습니다`);
    }
  };

  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`accordion-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        {accounts.map((acc, idx) => (
          <div key={idx} className="account-row">
            <div className="account-info">
              <div className="account-bank">{acc.bank}</div>
              <div className="account-number">{acc.number}</div>
              <div className="account-owner">{acc.owner}</div>
            </div>
            <button className="copy-button" onClick={() => handleCopy(acc)}>
              복사
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AccountAccordion() {
  return (
    <section className="section section-white">
      <p className="section-title">ACCOUNT</p>
      <div className="section-line" />
      <div className="accordion-wrapper">
        <AccordionItem title="신부측 계좌번호" accounts={weddingData.accounts.bride} />
        <AccordionItem title="신랑측 계좌번호" accounts={weddingData.accounts.groom} />
      </div>
    </section>
  );
}
