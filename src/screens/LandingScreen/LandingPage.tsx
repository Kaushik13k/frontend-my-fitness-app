import {
  View,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  //   Animated,
} from 'react-native';
import React from 'react';

import styles from './LandingPageStyles';
import Footer from '../../components/Footer/Footer';
import MainScreenButton from '../../components/Button/MainScreenButton';
import Quotes from '../../components/Quotes/Quotes';
import Logo from '../../components/Logo/Logo';
import LanguageLogo from '../../components/Logo/LanguageLogo';

type Props = {
  imageUrl: ImageSourcePropType;
  //   buttonOpacity: Animated.Value;
};

const MainScreen = ({imageUrl}: Props) => {
  return (
    <>
      <ImageBackground
        style={styles.backgroundImage}
        source={imageUrl}
        blurRadius={1}>
        <View style={styles.headerContainer}>
          console.log('Rendering Logo and LanguageLogo');
          <Logo />
          <LanguageLogo />
        </View>
        <Quotes />
        <MainScreenButton />
      </ImageBackground>
      <Footer />
    </>
  );
};

export default function LandingPage() {
  return (
    <MainScreen
      imageUrl={require('../../assets/main-page.jpg')}
      // buttonOpacity={buttonOpacity}
    />
  );
}
