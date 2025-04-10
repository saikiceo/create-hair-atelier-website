// src/components/layout/PageWrapper.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// theme.js から theme オブジェクトをインポート
import { theme } from '../../styles/theme';

// ページ全体のラッパーとなる main 要素のスタイル
const Wrapper = styled(motion.main)`
  // ヘッダーが固定されているため、ヘッダーの高さ分だけ上に余白を取る
  // theme オブジェクトから headerHeight の値を取得
  padding-top: ${theme.headerHeight};
  // 最小でも画面の高さからヘッダーの高さを引いた分だけ高さを確保する
  // これにより、コンテンツが少なくてもフッターが画面下部に固定されやすくなる
  min-height: calc(100vh - ${theme.headerHeight});
  /* 必要に応じて、ページ共通の他のスタイル（例: 最大幅など）を追加 */
  /* max-width: 1600px; */
  /* margin: 0 auto; */
`;

// Framer Motion で使うページ遷移アニメーションの定義
const pageVariants = {
    initial: { opacity: 0, y: 20 }, // 初期状態: 少し下にずれて透明
    in: { opacity: 1, y: 0 },       // 表示状態: 元の位置で不透明
    out: { opacity: 0, y: -20 }      // 離脱状態: 少し上にずれて透明
};

// ページ遷移アニメーションのタイミングなどの設定
const pageTransition = {
    type: "tween",      // アニメーションタイプ (時間ベース)
    ease: "anticipate", // イージング (開始/終了時に少し弾む感じ)
    duration: 0.6       // アニメーション時間 (0.6秒)
};

// PageWrapper コンポーネント本体
// children プロパティを受け取り、それを Wrapper で囲んで表示する
const PageWrapper = ({ children }) => {
  return (
    <Wrapper
      initial="initial"   // アニメーションの初期状態
      animate="in"        // アニメーションの表示状態
      exit="out"          // アニメーションの離脱状態
      variants={pageVariants} // 使用するアニメーション定義
      transition={pageTransition} // 使用するアニメーション設定
    >
      {/* 受け取った子要素（ページの実際のコンテンツ）を表示 */}
      {children}
    </Wrapper>
  );
};

// 他のファイルで import できるようにエクスポート
export default PageWrapper;