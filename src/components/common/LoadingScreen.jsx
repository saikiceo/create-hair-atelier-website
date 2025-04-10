// src/components/common/LoadingScreen.jsx
import React from 'react';
// styled-components と keyframes を react から import するのではなく、styled-components から import します
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion'; // アニメーション用のライブラリ

// ローディング画面全体のスタイル定義
const LoadingContainer = styled(motion.div)`
  position: fixed; /* 画面全体に固定表示 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background}; /* 背景色をテーマから取得 */
  display: flex; /* 中の要素を中央寄せにするための設定 (flexbox) */
  justify-content: center; /* 水平方向中央寄せ */
  align-items: center; /* 垂直方向中央寄せ */
  z-index: 9999; /* 他の要素より手前に表示 */
  flex-direction: column; /* 中の要素を縦に並べる */
  gap: ${({ theme }) => theme.spacing.md}; /* 要素間の隙間をテーマから取得 */
`;

// CSSアニメーション (キーフレーム) の定義: ふわふわと拡大縮小する動き
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; } /* 開始時: 通常サイズ、不透明 */
  50% { transform: scale(1.1); opacity: 0.7; } /* 中間: 少し拡大、少し透明に */
  100% { transform: scale(1); opacity: 1; } /* 終了時: 通常サイズ、不透明に戻る */
`;

// ローディング中のアニメーション要素（円）のスタイル定義
const LoadingElement = styled.div`
  /* 実際のロゴ画像やSVGに置き換えることも可能 */
  width: 80px; /* 幅 */
  height: 80px; /* 高さ */
  border-radius: 50%; /* 円にする */
  /* 背景色をテーマのプライマリカラーとアクセントカラーのグラデーションにする */
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  /* 上で定義した 'pulse' アニメーションを適用 */
  /* 1.5秒かけて、ゆっくり始まってゆっくり終わる(ease-in-out)、無限に繰り返す(infinite) */
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: flex; /* 中の文字を中央寄せ */
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.heading}; /* 見出し用フォント */
  color: ${({ theme }) => theme.colors.white}; /* 文字色を白に */
  font-size: 1.8rem; /* 文字サイズ */
  font-weight: bold; /* 太字 */
  /* 影をつけて少し立体的に */
  box-shadow: 0 0 20px rgba(208, 0, 111, 0.4); /* プライマリカラー系の影 */
`;

// "Loading..." テキストのスタイル定義
const LoadingText = styled.p`
    color: ${({ theme }) => theme.colors.primary}; /* 文字色をプライマリカラーに */
    font-weight: bold; /* 太字 */
    font-size: 1rem; /* 文字サイズ */
`;

// LoadingScreenコンポーネント本体
const LoadingScreen = () => {
  return (
    // LoadingContainer を motion.div として使うことで、表示・非表示のアニメーションを設定できる
    <LoadingContainer
      initial={{ opacity: 1 }} // 初期状態: 不透明
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }} // 消えるとき: 0.2秒待ってから0.5秒かけてフェードアウト
    >
      {/* アニメーションする円を表示 */}
      <LoadingElement>
         {/* 例としてイニシャル "CHA" を表示 */}
         CHA
      </LoadingElement>
      {/* "Loading..." テキストを表示 */}
      <LoadingText>Loading Experience...</LoadingText>
    </LoadingContainer>
  );
};

// このファイルを他の場所で import できるように export する
export default LoadingScreen;