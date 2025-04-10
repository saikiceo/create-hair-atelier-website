// src/components/sections/AboutSection.jsx
import React, { useRef } from 'react'; // useRef フックをインポート (DOM要素への参照用)
import styled from 'styled-components';
// framer-motion から motion (アニメーション), useScroll (スクロール位置取得), useTransform (値の変換) をインポート
import { motion, useScroll, useTransform } from 'framer-motion';
// アバウトセクションで使用する画像ファイルをインポート (パスは実際のファイルに合わせてください)
// ファイルが存在しない場合は、この行をコメントアウトするか、画像が表示されない状態になります
//import aboutImage from '../../assets/images/about-image.jpg';

// アバウトセクション全体のラッパー要素のスタイル
const AboutWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg}; /* 上下 特大、左右 大 の余白 */
  background-color: ${({ theme }) => theme.colors.white}; /* 背景色 白 */
  display: grid; /* グリッドレイアウト */
  grid-template-columns: 1fr 1fr; /* 左右に2つのカラム、均等割 */
  gap: ${({ theme }) => theme.spacing.xl}; /* カラム間の隙間 特大 */
  align-items: center; /* 要素を垂直方向中央に揃える */
  overflow-x: hidden; /* アニメーションで要素がはみ出ないように */
  position: relative; /* 装飾用疑似要素などの基準点 */

   /* オプション: 背景に薄いパターンなどを追加する場合 */
   /* &::before {
       content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
       background-image: url('/path/to/subtle-pattern.png'); opacity: 0.05; z-index: 0;
   } */

  /* タブレットサイズ以下でのスタイル */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr; /* 1カラムレイアウトに変更 */
    text-align: center; /* テキストを中央揃えに */
    padding: ${({ theme }) => theme.spacing.lg}; /* 余白を少し狭く */
    gap: ${({ theme }) => theme.spacing.lg}; /* 隙間も狭く */
  }
`;

// 左側のテキストコンテンツ部分のスタイル
const TextContent = styled(motion.div)`
  position: relative; /* z-indexを効かせるため */
  z-index: 1; /* 背景パターンなどより手前に */

  h2 { /* セクションタイトル (h2) */
    color: ${({ theme }) => theme.colors.primary}; /* 文字色 プライマリカラー */
    font-size: clamp(2rem, 5vw, 3rem); /* レスポンシブフォントサイズ */
    margin-bottom: ${({ theme }) => theme.spacing.md}; /* 下の余白 */
    line-height: 1.3; /* 行間 */
  }

  p { /* 段落 (p) */
    font-size: 1.1rem; /* 文字サイズ */
    line-height: 1.8; /* 行間を広めに */
    margin-bottom: ${({ theme }) => theme.spacing.md}; /* 段落下部の余白 */
    color: ${({ theme }) => theme.colors.text}; /* 文字色 基本 */
  }

  /* タブレットサイズ以下ではテキストを画像の下に配置 */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
     order: 2; /* グリッド内の表示順序を2番目に */
     margin-top: ${({ theme }) => theme.spacing.lg}; /* 画像との間に隙間 */
      p {
          font-size: 1rem; /* モバイルでは少し文字を小さく */
      }
  }
`;

// 右側の画像部分のラッパー要素のスタイル
const ImageWrapper = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius}; /* 角を丸める */
  overflow: hidden; /* 中の画像がはみ出ないように */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); /* 少し強めの影 */
  position: relative; /* z-indexを効かせるため */
  z-index: 1;

  img { /* 画像本体 */
    display: block; /* 下の余分な隙間を削除 */
    width: 100%; /* 親要素いっぱいに広げる */
    height: auto; /* 高さは自動 */
    aspect-ratio: 4 / 3; /* 画像の縦横比を4:3に固定 */
    object-fit: cover; /* コンテナに合わせて画像をトリミング */
  }

   /* タブレットサイズ以下では画像をテキストの上に配置 */
   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
     order: 1; /* グリッド内の表示順序を1番目に */
   }
`;

// 段落ごとのスクロール連動アニメーション用コンポーネント
const Paragraph = ({ children }) => {
  const ref = useRef(null); // この段落要素への参照
  // この段落が画面に入ってくるときのスクロール進行度を取得
  const { scrollYProgress } = useScroll({
    target: ref, // 監視対象はこの段落要素
    // アニメーション開始: 要素の下端が画面の上端に来た時 (start end)
    // アニメーション終了: 要素の上端が画面の下端に来た時 (end start)
    // offsetを調整することでアニメーションタイミングを変更できる
     offset: ["start 0.9", "end 0.2"] // 要素が80%くらい見えたら開始、20%くらい見えたら終了
  });
  // スクロール進行度 (0->1) に応じてスタイルを変化させる
  // opacity: 0 -> 1 (フェードイン)
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]); // 進行度0.6で完全に表示
  // y: 20 -> 0 (下から少しスライドアップ)
  const y = useTransform(scrollYProgress, [0, 0.6], [20, 0]);

  // motion.p を使ってアニメーションを適用
  return (
    <motion.p ref={ref} style={{ opacity, y }}>
      {children}
    </motion.p>
  );
};

// AboutSectionコンポーネント本体
const AboutSection = () => {
  const sectionRef = useRef(null); // セクション全体への参照
  const imgRef = useRef(null); // 画像ラッパーへの参照
  // セクション全体が画面を通過する際のスクロール進行度を取得
  const { scrollYProgress } = useScroll({
      target: sectionRef, // 監視対象はセクション全体
      offset: ["start end", "end start"] // セクションが見え始めてから見えなくなるまで
  });

  // スクロール進行度に応じて画像に適用するスタイルを計算
  // scale: 0.9 -> 1 (少しズームインしながら表示)
  const imageScale = useTransform(scrollYProgress, [0.1, 0.7], [0.9, 1]);
  // opacity: 0.5 -> 1 (半透明からフェードイン)
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    // id を "about-section" に設定 (ヒーローセクションの矢印からスクロールするため)
    <AboutWrapper ref={sectionRef} id="about-section">
      {/* 左側のテキストコンテンツ */}
      <TextContent>
        {/* セクションタイトル (h2) の初期アニメーション */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }} // 最初は左にずれて透明
          whileInView={{ opacity: 1, x: 0 }} // 画面内に入ったら元の位置に不透明に
          viewport={{ once: true, amount: 0.5 }} // 画面に50%入ったら一度だけアニメーション
          transition={{ duration: 0.6, ease: "easeOut" }} // アニメーション時間とイージング
        >
          私たちの物語：<br/>渋谷の小さなアトリエから
        </motion.h2>
        {/* 各段落を Paragraph コンポーネントでラップしてスクロールアニメーションを適用 */}
        <Paragraph>
          Create Hair Atelierは、渋谷の中心に佇む、わずか3席の小さな隠れ家サロンです。私たちは「小規模」であることを最大の強みと考え、一人ひとりのお客様と深く、丁寧に向き合います。
        </Paragraph>
        <Paragraph>
          経験豊富なプロフェッショナルが集い、あなたの髪質、骨格、ライフスタイル、そして言葉にならない「なりたいイメージ」まで繊細に読み解き、<strong>想像を超えるスタイル</strong>を創造します。
        </Paragraph>
        <Paragraph>
          渋谷のトレンドを取り入れつつも、決して流されることなく、あなただけの個性が最も輝くデザインをご提案。技術と心で、地域に根ざし、長く愛されるサロンを目指しています。
        </Paragraph>
      </TextContent>
      {/* 右側の画像ラッパー (スクロール連動アニメーション適用) */}
      <ImageWrapper
         ref={imgRef} // 参照を設定
         style={{ scale: imageScale, opacity: imageOpacity }} // 計算したスタイルを適用
      >
        {/* 画像を表示 (loading="lazy"で遅延読み込み) */}
        <img src={aboutImage} alt="Create Hair Atelier 店内風景" loading="lazy" />
      </ImageWrapper>
    </AboutWrapper>
  );
};

export default AboutSection; // コンポーネントをエクスポート