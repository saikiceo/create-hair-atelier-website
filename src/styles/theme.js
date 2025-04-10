// src/styles/theme.js
export const theme = {
    colors: {
      background: '#F8F8F8', // Off-white background - やや白に近い背景色
      text: '#333333',       // Charcoal text - 基本の文字色（濃い灰色）
      primary: '#D0006F',    // Deep Magenta accent - アクセントカラー（濃いマゼンタ）美容室の特徴的な色
      secondary: '#AAAAAA',  // Soft Gray - 補助的な色（柔らかい灰色）
      accent: '#00FFFF',     // Electric Teal - もう一つのアクセント（明るい水色）ホバー時などに使用
      white: '#FFFFFF',      // White - 白色
      black: '#000000',      // Black - 黒色
      error: '#E53E3E',     // Red for errors - エラー表示用の赤色
      success: '#2F855A',   // Green for success - 成功表示用の緑色
    },
    fonts: {
      primary: "'Helvetica Neue', 'Arial', sans-serif", // Clean sans-serif - 基本のフォント（ゴシック系）
      heading: "'Playfair Display', serif",        // Elegant serif for headings - 見出し用のフォント（セリフ系、上品な印象）
    },
    // レスポンシブデザインのための画面幅の区切り
    breakpoints: {
      mobile: '480px',     // モバイルサイズ（これ以下）
      tablet: '768px',     // タブレットサイズ（これ以下）
      desktop: '1024px',   // デスクトップサイズ（これ以下）
      largeDesktop: '1440px', // 大きなデスクトップサイズ（これ以下）
    },
    // 要素間のスペース（余白）の定義
    spacing: {
      xs: '4px',  // 極小
      sm: '8px',  // 小
      md: '16px', // 中
      lg: '32px', // 大
      xl: '64px', // 特大
      xxl: '128px',// 超特大
    },
    borderRadius: '8px', // 要素の角の丸み
    transition: 'all 0.3s ease-in-out', // アニメーションの基本設定（0.3秒で変化）
    headerHeight: '80px', // ヘッダーの高さ（他の要素がヘッダーと重ならないようにするため）
  };