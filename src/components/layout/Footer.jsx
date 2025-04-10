// src/components/layout/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // ページ内リンク用

// フッター要素全体のスタイル
const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.text}; /* 背景色: テーマの濃い灰色 */
  color: ${({ theme }) => theme.colors.background}; /* 文字色: テーマの薄い灰色 */
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl}; /* 上下の余白 大、左右の余白 特大 */
  margin-top: ${({ theme }) => theme.spacing.xl}; /* フッターの上に隙間を空ける */
`;

// フッター内のコンテンツをグリッドレイアウトで配置するためのコンテナ
const FooterContent = styled.div`
  display: grid; /* グリッドレイアウトを使用 */
  /* 各列の最小幅200px、可能な限り均等に分割 */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}; /* 列間の隙間 大 */
  max-width: 1200px; /* フッター内容の最大幅 */
  margin: 0 auto; /* 中央揃え */
`;

// フッターの各列のスタイル
const FooterColumn = styled.div`
  h4 { /* 列のタイトル */
    color: ${({ theme }) => theme.colors.primary}; /* タイトル色: プライマリカラー */
    margin-bottom: ${({ theme }) => theme.spacing.md}; /* タイトル下の余白 中 */
    font-size: 1.2rem; /* タイトルの文字サイズ */
  }

  ul { /* リンクのリスト */
    list-style: none; /* リストのマーカー（点）を非表示 */
    padding: 0;
    margin: 0;
  }

  li { /* リストの各項目 */
    margin-bottom: ${({ theme }) => theme.spacing.sm}; /* 項目間の余白 小 */
  }

  a { /* リンク */
    color: ${({ theme }) => theme.colors.background}; /* リンク文字色: フッターの基本文字色 */
    text-decoration: none;
    &:hover { /* リンクにマウスが乗った時 */
      color: ${({ theme }) => theme.colors.accent}; /* 文字色をアクセントカラーに */
    }
  }

  p { /* 通常のテキスト（住所や営業時間など） */
    font-size: 0.9rem; /* 文字サイズを少し小さめに */
    line-height: 1.5; /* 行間 */
  }
`;

// SNSリンクのスタイル
const SocialLinks = styled.div`
  display: flex; /* アイコンを横並びにする */
  gap: ${({ theme }) => theme.spacing.md}; /* アイコン間の隙間 中 */
  margin-top: ${({ theme }) => theme.spacing.sm}; /* 上の要素との隙間 小 */

  a {
    font-size: 1.5rem; /* アイコンのサイズ */
    color: ${({ theme }) => theme.colors.background}; /* アイコンの色 */
    transition: color 0.3s ease; /* 色の変化を滑らかに */
     &:hover { /* マウスが乗った時 */
      color: ${({ theme }) => theme.colors.accent}; /* 色をアクセントカラーに */
    }
  }
  /* 実際にはここにFontAwesomeなどのアイコンフォントやSVGアイコンを挿入します */
  /* 例: <i className="fab fa-instagram"></i> */
`;

// コピーライト表示部分のスタイル
const Copyright = styled.div`
  text-align: center; /* 中央揃え */
  margin-top: ${({ theme }) => theme.spacing.lg}; /* 上のグリッドとの隙間 大 */
  padding-top: ${({ theme }) => theme.spacing.md}; /* 上の境界線との隙間 中 */
  border-top: 1px solid ${({ theme }) => theme.colors.secondary}; /* 上に境界線 */
  font-size: 0.8rem; /* 文字サイズを小さめに */
  color: ${({ theme }) => theme.colors.secondary}; /* 文字色: 補助的な灰色 */
`;

// Footerコンポーネント本体
const Footer = () => {
  const currentYear = new Date().getFullYear(); // 現在の西暦年を取得

  return (
    <StyledFooter>
      <FooterContent>
        {/* 列1: サロン情報 */}
        <FooterColumn>
          <h4>Create Hair Atelier</h4>
          <p>
            〒150-XXXX 東京都渋谷区... <br />
            [ここに住所詳細を記入してください] <br />
            Tel: 03-xxxx-xxxx <br />
            Email: info@create-hair.example.com
          </p>
        </FooterColumn>

        {/* 列2: サイト内リンク */}
        <FooterColumn>
          <h4>Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/staff">Stylists</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* 必要に応じてプライバシーポリシー等のリンクを追加 */}
            {/* <li><Link to="/privacy">Privacy Policy</Link></li> */}
          </ul>
        </FooterColumn>

        {/* 列3: 営業時間 */}
        <FooterColumn>
          <h4>Opening Hours</h4>
          <p>
            平日: 10:00 - 20:00 <br />
            土日祝: 9:00 - 19:00 <br />
            定休日: 毎週火曜日、第3月曜日
          </p>
        </FooterColumn>

         {/* 列4: SNSリンク */}
         <FooterColumn>
          <h4>Follow Us</h4>
          <SocialLinks>
            {/* ここに実際のSNSアカウントへのリンクとアイコンを挿入 */}
            {/* 例: FontAwesome を使う場合 */}
            {/* <a href="https://instagram.com/your_account" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a> */}
            {/* 今はプレースホルダーテキストを表示 */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Insta</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Fb</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Tw</a>
          </SocialLinks>
        </FooterColumn>
      </FooterContent>

      {/* コピーライト */}
      <Copyright>
        © {currentYear} Create Hair Atelier. All Rights Reserved.
      </Copyright>
    </StyledFooter>
  );
};

export default Footer;