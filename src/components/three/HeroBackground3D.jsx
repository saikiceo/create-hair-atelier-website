// src/components/three/HeroBackground3D.jsx
import React, { useRef, useMemo } from 'react';
// @react-three/fiber から Canvas (3D描画領域), useFrame (毎フレーム実行), useThree (3Dシーン情報取得) をインポート
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// @react-three/drei から Points (点群), PointMaterial (点の見た目) をインポート
import { Points, PointMaterial } from '@react-three/drei';
// Three.js 本体も使うことがあるのでインポート (今回は MathUtils で使用)
import * as THREE from 'three';

// 浮遊するパーティクル（点群）を描画するコンポーネント
function FloatingParticles({ count = 5000 }) { // count はパーティクルの数、デフォルト5000
  const pointsRef = useRef(); // Pointsオブジェクトへの参照を保持
  const { size } = useThree(); // 現在のCanvasのサイズ（幅、高さ）を取得

  // パーティクルの初期位置を計算（初回レンダリング時とCanvas幅変更時のみ再計算）
  const particlesPosition = useMemo(() => {
    // Float32Array は効率的に数値を扱える配列
    const positions = new Float32Array(count * 3); // 各点にx, y, z座標が必要なので count * 3
    const distance = 10; // パーティクルが広がる範囲（距離）

    for (let i = 0; i < count; i++) {
      // 各座標をランダムに生成 (-0.5 ～ 0.5 の範囲 * distance)
      // X座標はCanvasの幅に応じて広がり方を調整 (size.width / 800 で基準幅800pxに対する比率をかける)
      const x = (Math.random() - 0.5) * distance * (size.width / 800);
      const y = (Math.random() - 0.5) * distance;
      // Z座標は -1 より奥に配置して背景感を出す
      const z = (Math.random() - 0.5) * distance - 1;
      // 計算した座標を positions 配列にセット
      positions.set([x, y, z], i * 3); // i * 3 は配列内の開始インデックス
    }
    return positions; // 計算結果の座標配列を返す
  }, [count, size.width]); // count または size.width が変わったら再計算

  // useFrame フック: 毎フレーム実行される処理
  useFrame((state, delta) => {
    // state から clock (時間) と mouse (マウス座標) を取得
    const { clock, mouse } = state;
    // pointsRef.current が存在すれば（Pointsオブジェクトが描画されていれば）
    if (pointsRef.current) {
      // Y軸周りにゆっくり回転 (時間経過 clock.getElapsedTime() に応じて)
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;

      // マウスのY座標に応じてX軸周りに少し回転させる (lerpで滑らかに変化)
      // mouse.y は通常 -1 ～ 1 の範囲
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, (mouse.y * Math.PI) / 10, 0.1);
      // マウスのX座標に応じてY軸周りの回転に少し影響を与える (lerpで滑らかに変化)
      pointsRef.current.rotation.y += THREE.MathUtils.lerp(0, (mouse.x * Math.PI) / 10, 0.05);
    }
  });

  // 点群 (Points) を描画
  return (
    <Points
      ref={pointsRef} // 上で作成したrefを関連付け
      positions={particlesPosition} // 計算したパーティクル座標を渡す
      stride={3} // positions 配列の各点が何個の数値で構成されるか (x, y, z なので 3)
      frustumCulled={false} // カメラの視錐台（見える範囲）外でも描画するかどうか (背景なので常に描画)
    >
      {/* 点の見た目を定義するマテリアル */}
      <PointMaterial
        transparent // 透明度を有効にする
        color="#D0006F" // 点の色 (プライマリカラー)
        size={0.015} // 点の基本サイズ
        sizeAttenuation={true} // カメラからの距離で点のサイズを変えるか (遠くは小さく)
        depthWrite={false} // 他のオブジェクトの描画に影響を与えないようにする（背景向け）
        opacity={0.6} // 点の透明度 (少し透ける)
      />
    </Points>
  );
}

// HeroBackground3D コンポーネント本体
// React.memo でラップし、props が変わらない限り再レンダリングしないように最適化
const HeroBackground3D = React.memo(() => {
  return (
    // 背景として配置するためのdiv要素
    <div style={{
      position: 'absolute', // 親要素に対して絶対位置指定
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0, // 他のヒーローセクションのコンテンツより奥に配置
      pointerEvents: 'none', // マウス操作を透過させる (下の要素をクリックできるように)
      opacity: 0.7 // 全体の透明度を少し下げる
    }}>
       {/* 3D描画領域である Canvas */}
       <Canvas camera={{ position: [0, 0, 1], fov: 75 }}> {/* カメラの位置と視野角を設定 */}
        {/* 環境光（全体を照らす光）はパーティクルだけなら不要なことが多い */}
        {/* <ambientLight intensity={0.5} /> */}
        {/* 上で定義した FloatingParticles コンポーネントを描画 */}
        <FloatingParticles />
      </Canvas>
    </div>
  );
});
// React DevTools で表示されるコンポーネント名を指定（デバッグしやすくするため）
HeroBackground3D.displayName = 'HeroBackground3D';

// HeroBackground3D コンポーネントをエクスポート
export default HeroBackground3D;