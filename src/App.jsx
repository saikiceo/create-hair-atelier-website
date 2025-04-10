// src/App.jsx
import React, { useState, useEffect, Suspense } from 'react'; // React と関連フック、Suspense をインポート
// react-router-dom からルーティング関連のコンポーネントをインポート
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// styled-components から ThemeProvider をインポート (テーマを適用するため)
import { ThemeProvider } from 'styled-components';
// framer-motion から AnimatePresence をインポート (ページ遷移アニメーションのため)
import { AnimatePresence } from 'framer-motion';

// 作成したテーマ設定、グローバルCSS、コンポーネントをインポート
import { theme } from './styles/theme';
import './styles/global.css'; // グローバルCSSを読み込む
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/common/LoadingScreen';

// ページコンポーネントを「遅延読み込み(lazy loading)」でインポート
// これにより、最初に全てのページのコードを読み込まず、必要な時に読み込むようになり、初期表示が速くなります
const HomePage = React.lazy(() => import('./pages/HomePage'));
// 他のページのコンポーネントも同様に定義（今はまだファイルが存在しなくてもOK）
// const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
// const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
// const StaffPage = React.lazy(() => import('./pages/StaffPage'));
// const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// アプリケーションのメインコンテンツ部分を担当するコンポーネント
function AppContent() {
  const location = useLocation(); // 現在のURL情報を取得 (AnimatePresenceがページ変更を検知するために必要)
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理 (true: ローディング中)

  // 最初の読み込み演出のためのuseEffect
  useEffect(() => {
    // 実際のサイトでは画像などの読み込み完了を待つ処理を入れる
    // ここではsetTimeoutを使って、2.5秒後にローディング完了とする（仮の処理）
    const timer = setTimeout(() => {
      setIsLoading(false); // ローディング状態を false に変更
    }, 2500); // 2500ミリ秒 = 2.5秒

    // クリーンアップ関数: コンポーネントが不要になった時にタイマーを解除
    return () => clearTimeout(timer);
  }, []); // 空の依存配列 [] は、このuseEffectが最初のマウント時に一度だけ実行されることを意味する

  // isLoadingがtrueの間はローディング画面を表示
  if (isLoading) {
    return <LoadingScreen />;
  }

  // ページ遷移アニメーションの定義
  const pageVariants = {
    initial: { opacity: 0, y: 20 }, // 遷移開始時: 少し下にずれて透明
    in: { opacity: 1, y: 0 },       // 遷移完了時: 元の位置に戻り不透明に
    out: { opacity: 0, y: -20 }      // ページ離脱時: 少し上にずれて透明に
  };

  // ページ遷移アニメーションの詳細設定
  const pageTransition = {
    type: "tween", // アニメーションの種類 (tween: 時間ベース)
    ease: "anticipate", // イージング関数 (開始時と終了時に少しオーバーシュートする感じ)
    duration: 0.6 // アニメーション時間 (0.6秒)
  };

  // ローディング完了後に表示する内容
  return (
    <> {/* フラグメント */}
      <Header /> {/* ヘッダーを常に表示 */}
      {/* AnimatePresence: 中の要素が変わる時にアニメーションを実行 */}
      {/* mode="wait": 離脱アニメーションが終わってから次の要素の参入アニメーションを開始 */}
      <AnimatePresence mode="wait">
         {/* Suspense: 遅延読み込み中の代替表示を指定 */}
         {/* fallback={<LoadingScreen />}: ページの読み込みが終わるまでローディング画面を表示 */}
        <Suspense fallback={<LoadingScreen />}>
          {/* Routes: URLに応じて表示するコンポーネントを切り替える */}
          {/* location と key を渡すことで AnimatePresence がURL変更を正しく検知 */}
          <Routes location={location} key={location.pathname}>
            {/* ルートパス ("/") に HomePage を割り当て */}
            {/* ※ HomePageコンポーネント自体に motion.main を追加してアニメーションを適用する必要があります */}
            {/*   (このパート1の段階ではHomePageにはまだ適用されていません) */}
            <Route path="/" element={<HomePage />} />

            {/* 他のページのルート定義 (今はコメントアウト) */}
            {/* element 内で <motion.main ...> でラップすることでアニメーションが適用されます */}
            {/*
            <Route path="/services" element={<Suspense fallback={<LoadingScreen />}><motion.main variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><ServicesPage /></motion.main></Suspense>} />
            <Route path="/gallery" element={<Suspense fallback={<LoadingScreen />}><motion.main variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><GalleryPage /></motion.main></Suspense>} />
            <Route path="/staff" element={<Suspense fallback={<LoadingScreen />}><motion.main variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><StaffPage /></motion.main></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<LoadingScreen />}><motion.main variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><ContactPage /></motion.main></Suspense>} />
            */}
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer /> {/* フッターを常に表示 */}
    </>
  );
}

// アプリケーション全体のルートコンポーネント
function App() {
  return (
    // ThemeProvider: アプリ全体にテーマ設定（色やフォントなど）を適用
    <ThemeProvider theme={theme}>
      {/* Router: アプリ全体でルーティング機能を有効にする */}
      <Router>
        {/* AppContentコンポーネントを呼び出す */}
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; // Appコンポーネントをエクスポート