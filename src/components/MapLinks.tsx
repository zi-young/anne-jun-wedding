'use client';

import { weddingData } from '@/data/wedding';

export default function MapLinks() {
  const { venue } = weddingData;
  const encodedAddress = encodeURIComponent(venue.address);
  const encodedName = encodeURIComponent(venue.name);

  // 딥링크 URL
  const naverMapUrl = `nmap://search?query=${encodedName}&appname=wedding`;
  const kakaoMapUrl = `kakaomap://search?q=${encodedName}`;
  const tmapUrl = `tmap://search?name=${encodedName}&address=${encodedAddress}`;

  // 폴백: 웹 URL
  const naverWebUrl = `https://map.naver.com/v5/search/${encodedName}`;
  const kakaoWebUrl = `https://map.kakao.com/?q=${encodedName}`;

  const handleMap = (appUrl: string, webUrl: string) => {
    window.location.href = appUrl;
    setTimeout(() => {
      // 앱이 열렸다면 탭이 숨겨진 상태 → 웹 폴백 불필요
      if (!document.hidden) {
        window.open(webUrl, '_blank');
      }
    }, 1500);
  };

  return (
    <section className="section location-section">
      <p className="section-title">LOCATION</p>
      <div className="section-line" />
      <h3 className="venue-name-display">{venue.name}</h3>
      <p className="venue-address-display">{venue.address}</p>
      <div className="map-button-group">
        <button
          className="map-button"
          onClick={() => handleMap(naverMapUrl, naverWebUrl)}
        >
          네이버 지도
        </button>
        <button
          className="map-button"
          onClick={() => handleMap(kakaoMapUrl, kakaoWebUrl)}
        >
          카카오맵
        </button>
        <button
          className="map-button"
          onClick={() => window.location.href = tmapUrl}
        >
          T맵
        </button>
      </div>
      <div className="shuttle-info">
        <p className="shuttle-title">셔틀버스 운행</p>
        <p className="shuttle-row">청계산입구역 2번 출구 (제이니힐 배너 앞)</p>
        <p className="shuttle-row">10:30부터 10&ndash;15분 간격 운행</p>
        <p className="shuttle-row">자가용으로 오시는 경우 제이니힐 입구까지 오시면 발렛요원이 대신 주차해 드립니다.</p>
      </div>
    </section>
  );
}
