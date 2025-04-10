// src/pages/HomePage.jsx
import React from 'react';
import styled from 'styled-components';
// この時点ではまだ他のコンポーネント（HeroSectionなど）はインポートしません

// HomePage全体のラッパー要素のスタイル
const HomePageContainer = styled.div`
  /* ヘッダーがfixed（固定）なので、ヘッダーの高さ分だけ上の余白を確保 */
  /* theme.js の headerHeight を直接参照するか、具体的なpx値を指定 */
  padding-top: ${({ theme }) => theme.headerHeight || '80px'};
`;

// 各セクションのプレースホルダー（仮表示）用のスタイル
// 後で実際のセクションコンポーネントに置き換えられます
const PlaceholderSection = styled.section`
  min-height: 50vh; /* 各セクションの最小の高さを画面の半分程度に */
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg}; /* セクション内の余白 */
  margin-bottom: ${({ theme }) => theme.spacing.lg}; /* セクション間の下の余白 */
  border: 1px dashed ${({ theme }) => theme.colors.secondary}; /* わかりやすいように点線の枠をつける */
  display: flex; /* 中のテキストを中央寄せ */
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 { /* プレースホルダー内の見出しのスタイル */
    color: ${({ theme }) => theme.colors.secondary}; /* 文字色を薄い灰色に */
    font-style: italic; /* 少し斜体にする */
  }
`;

// HomePageコンポーネント本体
const HomePage = () => {
  return (
    <HomePageContainer>
      {/* 将来ここに実際のコンポーネントが入る場所の目印 */}
      <PlaceholderSection><h2>Hero Section Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>About Us Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>Services Overview Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>Gallery Teaser Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>Stylist Intro Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>Testimonials Placeholder</h2></PlaceholderSection>
      <PlaceholderSection><h2>Contact Teaser Placeholder</h2></PlaceholderSection>
    </HomePageContainer>
  );
};

export default HomePage; // 他のファイルで使えるようにエクスポート