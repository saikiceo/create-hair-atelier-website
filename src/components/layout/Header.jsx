// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// react-router-dom から Link と NavLink をインポートします
// NavLink は現在表示中のページに対応するリンクに特別なスタイルを適用するのに便利です
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
// framer-motion から motion と AnimatePresence をインポートします
import { motion, AnimatePresence } from 'framer-motion';
// theme.js を直接インポートして使うこともできます
import { theme } from '../../styles/theme';

// ヘッダー要素全体のスタイル定義
const StyledHeader = styled(motion.header)`
  position: fixed; /* 画面上部に固定 */
  top: 0;
  left: 0;
  width: 100%;
  height: ${theme.headerHeight}; /* 高さをテーマから取得 */
  padding: 0 ${({ theme }) => theme.spacing.lg}; /* 左右の余白をテーマから取得 */
  /* スクロール状態に応じて背景の透明度を変える */
  background-color: ${({ $scrolled, theme }) => $scrolled ? 'rgba(248, 248, 248, 0.9)' : 'rgba(248, 248, 248, 0.7)'};
  backdrop-filter: blur(10px); /* 背景をぼかす（すりガラス効果） */
  -webkit-backdrop-filter: blur(10px); /* Safari向け */
  display: flex; /* 中の要素（ロゴ、ナビ）を横並びにする */
  justify-content: space-between; /* 要素間にスペースを空ける */
  align-items: center; /* 要素を垂直方向中央に揃える */
  z-index: 1000; /* 他の要素より手前に表示 */
  /* スクロールされたら影を表示 */
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  /* 影と背景色の変化を滑らかにする */
  transition: box-shadow 0.3s ease, background-color 0.3s ease;

   /* タブレットサイズ以下でのスタイル調整 */
   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
       padding: 0 ${({ theme }) => theme.spacing.md}; /* 左右の余白を少し狭く */
   }
`;

// ロゴ部分のスタイル定義 (Linkコンポーネントをラップ)
const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading}; /* 見出し用フォント */
  /* フォントサイズを画面幅に応じて変化させる (最小1.5rem, 最大1.8rem) */
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  font-weight: bold; /* 太字 */
  color: ${({ theme }) => theme.colors.primary}; /* プライマリカラー */
  text-decoration: none; /* 下線なし */
  flex-shrink: 0; /* ロゴが縮まないようにする */
`;

// ナビゲーションメニュー（デスクトップ用）のスタイル定義
const Nav = styled(motion.nav)`
  display: flex; /* リンクを横並びにする */
  gap: ${({ theme }) => theme.spacing.lg}; /* リンク間の隙間 */

  /* タブレットサイズ以下では非表示にする（モバイルメニューに切り替えるため） */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

// ナビゲーションリンクのスタイル定義 (RouterNavLinkをラップ)
const NavLink = styled(RouterNavLink)`
  font-family: ${({ theme }) => theme.fonts.primary}; /* 基本フォント */
  font-size: 1rem; /* 文字サイズ */
  font-weight: bold; /* 太字 */
  color: ${({ theme }) => theme.colors.text}; /* 基本文字色 */
  text-decoration: none; /* 下線なし */
  position: relative; /* 下線アニメーションの基準位置 */
  padding: 5px 0; /* 上下に少し余白 */
  transition: color 0.3s ease; /* 色の変化を滑らかに */

  /* リンクの下に表示する線の初期状態 (非表示) */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px; /* 文字の少し下に配置 */
    left: 0;
    width: 0; /* 最初は幅0 */
    height: 2px; /* 線の太さ */
    background-color: ${({ theme }) => theme.colors.accent}; /* 線の色 (アクセントカラー) */
    transition: width 0.3s ease; /* 幅の変化を滑らかに */
  }

  /* マウスが乗った時、またはアクティブな（現在表示中のページの）リンク */
  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary}; /* 文字色をプライマリカラーに */
  }

  /* アクティブなリンクの下線 */
  &.active::after {
    width: 100%; /* 幅を100%にして線を表示 */
    background-color: ${({ theme }) => theme.colors.primary}; /* 線の色をプライマリカラーに */
  }

  /* マウスが乗った時（ただしアクティブでない場合）の下線 */
  &:hover:not(.active)::after {
     width: 100%; /* 幅を100%にして線を表示 */
     background-color: ${({ theme }) => theme.colors.accent}; /* 線の色はアクセントカラーのまま */
  }
`;

// モバイルメニューを開閉するボタン（ハンバーガーメニューアイコン）のスタイル定義
const MobileMenuToggle = styled(motion.button)`
  display: none; /* デスクトップでは非表示 */
  background: none; /* 背景なし */
  border: none; /* 枠線なし */
  font-size: 1.8rem; /* アイコンサイズ */
  cursor: pointer; /* マウスカーソルを指マークに */
  color: ${({ theme }) => theme.colors.primary}; /* アイコンの色 */
  z-index: 1002; /* モバイルメニュー本体より手前に表示 */
  padding: 5px; /* クリック範囲を少し広げる */

  /* タブレットサイズ以下で表示 */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

// モバイルメニュー本体（画面右からスライドイン）のスタイル定義
const MobileMenu = styled(motion.div)`
    position: fixed; /* 画面に固定 */
    top: 0;
    right: 0;
    width: 70%; /* 画面幅の70% */
    max-width: 300px; /* 最大幅は300px */
    height: 100vh; /* 画面の高さ全体 */
    /* 背景色を少し透明にしてぼかし効果 */
    background-color: rgba(248, 248, 248, 0.98);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 1001; /* ヘッダーより手前、トグルボタンより後ろ */
    display: flex; /* 中の要素の配置設定 */
    flex-direction: column; /* 縦に並べる */
    align-items: center; /* 水平方向中央揃え */
    justify-content: center; /* 垂直方向中央揃え */
    gap: ${({ theme }) => theme.spacing.lg}; /* 要素間の隙間 */
    box-shadow: -5px 0 15px rgba(0,0,0,0.1); /* 左側に影をつける */
`;

// モバイルメニュー内のリンクのスタイル定義 (NavLinkのスタイルを継承)
const MobileNavLink = styled(NavLink)`
    font-size: 1.4rem; /* モバイル用に文字サイズを大きく */
`;

// Headerコンポーネント本体
const Header = () => {
  // useStateを使って状態を管理
  const [scrolled, setScrolled] = useState(false); // スクロール状態 (true/false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // モバイルメニューの開閉状態 (true/false)
  const location = useLocation(); // 現在のページのパスなどを取得

  // useEffectを使ってコンポーネントのマウント時や特定のタイミングで処理を実行
  useEffect(() => {
    // スクロールイベントを監視する関数
    const handleScroll = () => {
      // 垂直方向に50pxより多くスクロールされたら scrolled を true にする
      setScrolled(window.scrollY > 50);
    };
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // ページ遷移したらモバイルメニューを閉じる
    setMobileMenuOpen(false);

    // コンポーネントがアンマウントされる（表示されなくなる）時にイベントリスナーを削除（メモリリーク防止）
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // locationが変わる（ページ遷移する）たびにこのuseEffectを実行

  // モバイルメニューの開閉状態を切り替える関数
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // ヘッダー自体のアニメーション設定
  const headerVariants = {
      hidden: { y: -100, opacity: 0 }, // 初期状態: 上に隠れて透明
      visible: { y: 0, opacity: 1 }     // 表示状態: 元の位置に戻り不透明に
  };

   // モバイルメニューのアニメーション設定
  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0, transition: { type: 'tween', ease: 'easeIn', duration: 0.3 } }, // 初期状態: 右に隠れて透明
    visible: { x: 0, opacity: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } }    // 表示状態: 元の位置に戻り不透明に
  };

   // ナビゲーションの項目データ
   const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/staff', label: 'Stylists' },
    { path: '/contact', label: 'Contact' },
  ];

  // コンポーネントが実際に表示するJSX
  return (
    <> {/* フラグメント: 複数の要素をグループ化 */}
    {/* ヘッダー本体 */}
    <StyledHeader
      $scrolled={scrolled} // スクロール状態をスタイルに渡す ($マークはstyled-componentsの慣習)
      initial="hidden" // アニメーションの初期状態
      animate="visible" // アニメーションの表示状態
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} // アニメーションの詳細設定
      variants={headerVariants} // 使うアニメーション定義
    >
      {/* ロゴ */}
      <Logo to="/">Create Hair Atelier</Logo>
      {/* デスクトップ用ナビゲーション */}
      <Nav>
        {navItems.map(item => ( // navItems配列をループしてリンクを生成
          <NavLink
            key={item.path} // ループで要素を生成する際はユニークなkeyが必要
            to={item.path} // リンク先のパス
            // className="active" は RouterNavLink が自動で付与してくれる
          >
            {item.label} {/* リンクのテキスト */}
          </NavLink>
        ))}
      </Nav>
       {/* モバイルメニュー開閉ボタン */}
       <MobileMenuToggle
            onClick={toggleMobileMenu} // クリックで toggleMobileMenu 関数を実行
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} // スクリーンリーダー用ラベル
            whileTap={{ scale: 0.9 }} // タップ時に少し縮むアニメーション
            animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }} // 開閉でアイコンを回転させるアニメーション
        >
            {/* メニューが開いていれば '✕'、閉じていれば '☰' を表示 */}
            {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuToggle>

    </StyledHeader>

    {/* モバイルメニュー本体 (AnimatePresenceで開閉アニメーションを実現) */}
     <AnimatePresence>
        {/* mobileMenuOpen が true の場合のみ以下の要素を描画 */}
        {mobileMenuOpen && (
            <MobileMenu
                key="mobile-menu" // AnimatePresence内で要素を識別するためのキー
                variants={mobileMenuVariants} // 使うアニメーション定義
                initial="hidden" // 初期状態
                animate="visible" // 表示状態
                exit="hidden" // 消えるときの状態
            >
                {/* モバイルメニュー内のリンク */}
                {navItems.map(item => (
                <MobileNavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)} // リンククリックでメニューを閉じる
                >
                    {item.label}
                </MobileNavLink>
                ))}
                 {/* モバイルメニュー内に予約ボタンを置く例 (Buttonコンポーネントがまだないのでコメントアウト) */}
                 {/* <Button style={{marginTop: '20px'}} onClick={() => {console.log('Mobile Booking'); setMobileMenuOpen(false);}}>
                    オンライン予約
                 </Button> */}
            </MobileMenu>
        )}
      </AnimatePresence>
      </>
  );
};

export default Header; // 他のファイルで使えるようにエクスポート