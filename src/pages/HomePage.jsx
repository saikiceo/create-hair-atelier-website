// src/pages/HomePage.jsx
import React from 'react';
import styled from 'styled-components';

// パート2で作成したセクションコンポーネントをインポート
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
// パート1で作成したページラッパーもインポート（ページ遷移アニメーションのため）
import PageWrapper from '../components/layout/PageWrapper';

// HomePage全体のコンテナ（特にスタイルは不要な場合が多い）
// PageWrapperが基本的なマージンなどを担当
const HomePageContainer = styled.div`
  /* 必要であれば、ホームページ特有のスタイルを追加 */
`;

// パート1で作ったプレースホルダーはもう不要なので削除
// const PlaceholderSection = styled.section` ... `;

// HomePageコンポーネント本体
const HomePage = () => {
  return (
    // PageWrapperで囲むことで、ページ遷移アニメーションや共通スタイルを適用
    <PageWrapper>
      {/* 各セクションコンポーネントを順番に配置 */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />

      {/* --- ここから下は、まだ作成していないセクションのプレースホルダー --- */}
      {/* パート3以降で作成するセクションの場所を示しておく */}
      <div style={{ minHeight: '50vh', padding: '64px 32px', border: '1px dashed #AAAAAA', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#AAAAAA' }}>Gallery Teaser Placeholder</h2>
      </div>
       <div style={{ minHeight: '50vh', padding: '64px 32px', border: '1px dashed #AAAAAA', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#AAAAAA' }}>Stylist Intro Placeholder</h2>
      </div>
       <div style={{ minHeight: '50vh', padding: '64px 32px', border: '1px dashed #AAAAAA', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#AAAAAA' }}>Testimonials Placeholder</h2>
      </div>
       <div style={{ minHeight: '50vh', padding: '64px 32px', border: '1px dashed #AAAAAA', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#AAAAAA' }}>Contact Teaser Placeholder</h2>
      </div>
      {/* --- プレースホルダーここまで --- */}

    </PageWrapper> // PageWrapper で閉じるのを忘れずに
  );
};

export default HomePage; // エクスポート