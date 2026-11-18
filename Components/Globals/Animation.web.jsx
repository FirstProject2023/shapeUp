import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import lottie from 'lottie-web';

export default function Animation({ source, style, autoPlay = false, loop = true, speed = 1 }) {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      animationData: JSON.parse(JSON.stringify(source)),
      autoplay: autoPlay,
      loop,
    });
    animation.setSpeed(speed);
    return () => animation.destroy();
  }, [source, autoPlay, loop, speed]);

  return <View pointerEvents="none" style={style ?? StyleSheet.absoluteFill}>
    <div ref={container} aria-hidden="true" style={{ width: '100%', height: '100%' }} />
  </View>;
}
