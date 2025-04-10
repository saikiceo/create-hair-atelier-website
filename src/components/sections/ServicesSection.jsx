// src/components/sections/ServicesSection.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // アニメーション用

// --- アイコンファイルのインポート ---
// 実際のSVGファイルを src/assets/icons/ に配置してください。
// ファイルが存在しない場合は、エラーを避けるために一時的にコメントアウトするか、
// 下の img タグの src 属性を空にするなどの対応が必要です。
import CutIcon from '../../assets/icons/service-cut.svg';
import ColorIcon from '../../assets/icons/service-color.svg';
import PermIcon from '../../assets/icons/service-perm.svg';
import TreatmentIcon from '../../assets/icons/service-treatment.svg';
import HeadSpaIcon from '../../assets/icons/service-headspa.svg'; // 追加アイコン例
import StylingIcon from '../../assets/icons/service-styling.svg'; // 追加アイコン例

// サービスセクション全体のラッパー要素のスタイル
const ServicesWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg}; /* 上下 特大、左右 大 の余白 */
  background-color: ${({ theme }) => theme.colors.background}; /* 背景色: 基本の背景色 */
`;

// セクションタイトルのスタイル
const SectionTitle = styled(motion.h2)`
  text-align: center; /* 中央揃え */
  color: ${({ theme }) => theme.colors.primary}; /* 文字色: プライマリカラー */
  font-size: clamp(2rem, 5vw, 3rem); /* レスポンシブフォントサイズ */
  margin-bottom: ${({ theme }) => theme.spacing.xl}; /* 下に大きめの余白 */
`;

// サービスカードを並べるグリッドのスタイル
const ServiceGrid = styled(motion.div)`
  display: grid; /* グリッドレイアウト */
  /* 画面幅に応じて列数を自動調整。各列の最小幅280px、最大で均等分割 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}; /* カード間の隙間 大 */
  max-width: 1200px; /* グリッド全体の最大幅 */
  margin: 0 auto; /* 中央揃え */
`;

// 各サービスカードのスタイル
const ServiceCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white}; /* カード背景色: 白 */
  padding: ${({ theme }) => theme.spacing.lg}; /* カード内の余白 大 */
  border-radius: ${({ theme }) => theme.borderRadius}; /* 角を丸める */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); /* 影を薄くつける */
  text-align: center; /* 中のテキストを中央揃え */
  /* ホバー時のアニメーション設定 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex; /* 中の要素を Flexbox で配置 */
  flex-direction: column; /* 縦方向に並べる */
  align-items: center; /* 水平方向中央揃え */
  height: 100%; /* グリッド内で高さを揃える */

  &:hover { /* カードにマウスが乗った時 */
    transform: translateY(-10px) scale(1.03); /* 少し上に持ち上がり、少し拡大 */
    box-shadow: 0 15px 30px rgba(208, 0, 111, 0.15); /* 影を濃く、プライマリカラー系に */
  }
`;

// サービスアイコンを囲む円のスタイル
const ServiceIconWrapper = styled.div`
    background-color: rgba(208, 0, 111, 0.1); /* 背景色: 薄いプライマリカラー */
    border-radius: 50%; /* 円にする */
    padding: ${({ theme }) => theme.spacing.md}; /* アイコン周りの余白 中 */
    margin-bottom: ${({ theme }) => theme.spacing.md}; /* 下の要素との隙間 中 */
    display: inline-flex; /* 中のアイコンに合わせてサイズ調整 */
    transition: background-color 0.3s ease; /* 背景色の変化を滑らかに */

    /* 親のServiceCardがホバーされたら、背景色を変える */
    ${ServiceCard}:hover & {
        background-color: rgba(0, 255, 255, 0.15); /* 背景色: 薄いアクセントカラー */
    }
`;

// サービスアイコン画像自体のスタイル
const ServiceIcon = styled.img`
  width: 50px; /* アイコン幅 */
  height: 50px; /* アイコン高さ */
  /* filterを使ってSVGの色を変更する例 (プライマリカラーに近づける) */
  /* filterの値は目標の色に合わせて調整が必要です */
   filter: invert(15%) sepia(90%) saturate(4818%) hue-rotate(315deg) brightness(89%) contrast(104%);
`;

// サービス名のスタイル (h3)
const ServiceTitle = styled.h3`
  font-size: 1.4rem; /* 文字サイズ */
  color: ${({ theme }) => theme.colors.primary}; /* 文字色: プライマリカラー */
  margin-bottom: ${({ theme }) => theme.spacing.sm}; /* 下の余白 小 */
`;

// サービス説明文のスタイル (p)
const ServiceDescription = styled.p`
  font-size: 0.95rem; /* 文字サイズ */
  color: ${({ theme }) => theme.colors.secondary}; /* 文字色: 補助的な灰色 */
  line-height: 1.6; /* 行間 */
  flex-grow: 1; /* カード内で可能な限り高さを取る（他のカードと底辺を揃えるため） */
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* 下の余白（価格などを表示する場合に備えて） */
`;

// --- アニメーション定義 ---
// グリッド全体のアニメーション: カードを順番に表示
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // カードの表示を0.15秒ずつずらす
    },
  },
};

// 各カードのアニメーション
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // 初期状態: 下にずれて透明で少し小さい
  visible: {
    opacity: 1,
    y: 0,
    scale: 1, // 表示状態: 元の位置・サイズで不透明に
    transition: { duration: 0.5, ease: 'easeOut' }, // アニメーション設定
  },
};

// 表示するサービスデータの配列 (実際のデータに置き換えてください)
const services = [
  {
    id: 'cut', // ユニークなID
    icon: CutIcon, // インポートしたアイコン
    title: 'デザインカット',
    description: '骨格・髪質・ライフスタイルを考慮し、再現性の高いあなただけのスタイルを創造します。',
  },
  {
    id: 'color',
    icon: ColorIcon,
    title: 'パーソナルカラー',
    description: '透明感のあるカラーからデザインカラーまで。肌色を美しく見せる色味とダメージレス施術にこだわります。',
  },
  {
    id: 'perm',
    icon: PermIcon,
    title: '質感デジタルパーマ',
    description: '柔らかな手触りと優れた持続性が特徴。朝のスタイリングが格段に楽になる最新パーマ。',
  },
  {
    id: 'treatment',
    icon: TreatmentIcon,
    title: '髪質改善トリートメント',
    description: '厳選された薬剤で髪の内部から徹底補修。芯から潤う、艶やかなシルク髪へ導きます。',
  },
   {
    id: 'spa',
    icon: HeadSpaIcon, // 対応するアイコンファイルが必要
    title: 'リラクシング・ヘッドスパ',
    description: '頭皮環境を整え、心身ともにリフレッシュ。極上の癒やしと美髪効果をご提供します。',
  },
   {
    id: 'styling',
    icon: StylingIcon, // 対応するアイコンファイルが必要
    title: 'ヘアセット・アレンジ',
    description: '特別な日のためのアップスタイルから、日常のおしゃれアレンジまで幅広く対応します。',
  },
  // 他のサービスがあればここに追加
];

// ServicesSectionコンポーネント本体
const ServicesSection = () => {
  return (
    <ServicesWrapper id="services-section"> {/* セクションID */}
      {/* セクションタイトル (アニメーション) */}
      <SectionTitle
         initial={{ opacity: 0, y: -30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.5 }}
         transition={{ duration: 0.6 }}
      >
        私たちのサービス
      </SectionTitle>
      {/* サービスグリッド (アニメーション) */}
      <ServiceGrid
        variants={gridVariants} // グリッド用のアニメーション定義
        initial="hidden" // 初期状態
        whileInView="visible" // 画面内に入ったらアニメーション開始
        viewport={{ once: true, amount: 0.1 }} // 画面に10%入ったら一度だけ実行
      >
        {/* services配列をループして各サービスカードを描画 */}
        {services.map((service) => ( // indexの代わりにユニークなidをkeyに使う
          // 各カードにもアニメーションを適用
          <ServiceCard key={service.id} variants={cardVariants}>
             {/* アイコン */}
             <ServiceIconWrapper>
                 {/* service.icon が存在すれば画像を表示、なければ何も表示しない */}
                 {service.icon && <ServiceIcon src={service.icon} alt={`${service.title} icon`} />}
             </ServiceIconWrapper>
             {/* サービス名 */}
            <ServiceTitle>{service.title}</ServiceTitle>
            {/* 説明文 */}
            <ServiceDescription>{service.description}</ServiceDescription>
             {/* オプション: 価格などを表示する場合 */}
             {/* <ServicePrice>¥X,XXX~</ServicePrice> */}
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServicesWrapper>
  );
};

export default ServicesSection; // エクスポート