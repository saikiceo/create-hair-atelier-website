// src/components/sections/HeroSection.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // アニメーション用
import Button from '../common/Button'; // 作成したボタンコンポーネント
import HeroBackground3D from '../three/HeroBackground3D'; // 作成した3D背景コンポーネント

// ヒーローセクション全体のラッパー要素のスタイル
const HeroWrapper = styled.section`
  min-height: 100vh; /* 高さを画面の高さ(viewport height)ぴったりにする */
  display: flex; /* 中の要素を中央寄せ (flexbox) */
  align-items: center; /* 垂直方向中央 */
  justify-content: center; /* 水平方向中央 */
  position: relative; /* 中の絶対位置指定要素(背景やオーバーレイ)の基準点にする */
  overflow: hidden; /* 3D背景などがはみ出ないようにする */
  text-align: center; /* テキストを中央揃え */
  color: ${({ theme }) => theme.colors.white}; /* 基本文字色を白に (背景が暗いため) */
  padding: 0 ${({ theme }) => theme.spacing.lg}; /* 左右に余白 */

  /* 背景画像や3D背景の上に重ねる半透明のオーバーレイ (文字を読みやすくするため) */
  &::before {
    content: '';
    position: absolute; /* 絶対位置指定 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 上から下へ暗くなるグラデーション */
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
    z-index: 1; /* 背景(z-index:0)とコンテンツ(z-index:2)の間 */
  }
`;

// テキストやボタンなど、中央に表示するコンテンツのコンテナ
const ContentContainer = styled(motion.div)`
  position: relative; /* 絶対位置指定 */
  z-index: 2; /* オーバーレイより手前に表示 */
  max-width: 800px; /* コンテンツの最大幅 */
`;

// メインタイトル (h1) のスタイル
const Title = styled(motion.h1)`
  /* 画面幅に応じてフォントサイズを調整 (最小2.5rem, 推奨7vw, 最大5rem) */
  font-size: clamp(2.5rem, 7vw, 5rem);
  color: ${({ theme }) => theme.colors.white}; /* 文字色 白 */
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* 下の余白 */
  font-weight: 700; /* 太字 */
  letter-spacing: 1px; /* 文字間隔を少し広げる */
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6); /* 文字に影をつけて読みやすく */
`;

// サブタイトル (p) のスタイル
const Subtitle = styled(motion.p)`
  /* 画面幅に応じてフォントサイズを調整 (最小1.1rem, 推奨3vw, 最大1.6rem) */
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: rgba(255, 255, 255, 0.9); /* 少しだけ透明な白 */
  margin-bottom: ${({ theme }) => theme.spacing.lg}; /* 下の余白 */
  font-weight: 400; /* 通常の太さ */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); /* 文字に影 */
  max-width: 600px; /* サブタイトルの最大幅 */
  margin-left: auto; /* 中央揃え */
  margin-right: auto; /* 中央揃え */
`;

// アニメーション定義 (Framer Motion用)
// コンテナ全体のアニメーション: 中の子要素を順番に表示させる
const containerVariants = {
  hidden: { opacity: 0 }, // 初期状態: 透明
  visible: {
    opacity: 1, // 表示状態: 不透明
    transition: {
      staggerChildren: 0.3, // 子要素を0.3秒ずつずらして表示
      delayChildren: 1.0, // 全体のアニメーション開始を1秒遅らせる (ローディング画面の後)
    },
  },
};

// 各アイテム（タイトル、サブタイトル、ボタン）のアニメーション
const itemVariants = {
  hidden: { y: 30, opacity: 0 }, // 初期状態: 少し下にずれて透明
  visible: {
    y: 0, // 表示状態: 元の位置に
    opacity: 1, // 不透明に
    // バネのような動き (stiffness: 硬さ, damping: 抵抗)
    transition: { type: 'spring', stiffness: 60, damping: 15 },
  },
};

// 下スクロールを促す矢印アイコンのスタイル
const ScrollIndicator = styled(motion.div)`
    position: absolute; /* 絶対位置指定 */
    bottom: 40px; /* 下からの位置 */
    left: 50%; /* 水平方向中央 */
    transform: translateX(-50%); /* 正確に中央にする */
    z-index: 2; /* コンテンツと同じ階層 */
    color: white; /* アイコン色 */
    font-size: 2rem; /* アイコンサイズ */
    cursor: pointer; /* クリックできることを示す */
    opacity: 0.8; /* 少し透明に */
`;

// HeroSectionコンポーネント本体
const HeroSection = () => {
  // 下のセクションへスムーズにスクロールする関数
  const scrollToContent = () => {
      // id="about-section" を持つ要素を探す (AboutSectionに後でIDを追加します)
      const nextSection = document.getElementById('about-section');
      if (nextSection) { // 要素が見つかれば
          nextSection.scrollIntoView({ behavior: 'smooth' }); // スムーズスクロールでそこまで移動
      }
  };

  return (
    // id をつけておく (他の場所からリンクする場合などに使う)
    <HeroWrapper id="hero-section">
      {/* 3D背景コンポーネントを表示 */}
      <HeroBackground3D />

      {/* 画像背景を使う場合のプレースホルダー (今はコメントアウト) */}
      {/* <BackgroundImage src="/path/to/hero-image.jpg" alt="" /> */}

      {/* 中央のコンテンツコンテナ (アニメーション適用) */}
      <ContentContainer
        variants={containerVariants} // 上で定義したアニメーションを適用
        initial="hidden" // 初期状態
        animate="visible" // 表示状態
      >
        {/* タイトル (アニメーション適用) */}
        <Title variants={itemVariants}>
          Create Hair Atelier
        </Title>
        {/* サブタイトル (アニメーション適用) */}
        <Subtitle variants={itemVariants}>
          お客様の創造を超える、渋谷のプライベートヘアサロン。
          最高の技術と心温まるおもてなしで、あなただけの美しさを引き出します。
        </Subtitle>
        {/* ボタン (アニメーション適用) */}
        <motion.div variants={itemVariants}>
          {/* Buttonコンポーネントを使用 */}
          <Button onClick={() => console.log('Navigate to Booking System or Contact')}>
            ご予約はこちら
          </Button>
        </motion.div>
      </ContentContainer>

      {/* 下スクロールを促す矢印 */}
       <ScrollIndicator
            // アニメーション設定: 2.5秒後から表示し始め、上下にゆっくり動くのを繰り返す
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }}
            onClick={scrollToContent} // クリックでスクロール
            aria-label="Scroll down" // スクリーンリーダー用
        >
           ↓{/* ここをSVGアイコンなどに差し替えるとより良くなります */}
        </ScrollIndicator>
    </HeroWrapper>
  );
};

// 画像背景を使う場合のコンポーネント例 (今は使わない)
// const BackgroundImage = styled(motion.img)`
//   position: absolute;
//   top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;
// `;

export default HeroSection;