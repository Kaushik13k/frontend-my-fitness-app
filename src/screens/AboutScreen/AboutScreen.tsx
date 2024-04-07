import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import styles from './AboutScreenStyles';
import React, {useCallback, memo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';
type ProfileOptionProps = {
  title: string;
  subTitle: string;
  onPress: () => void;
};

type Props = {
  onPress: () => void;
};
const ProfileOption: React.FC<ProfileOptionProps> = memo(
  ({title, subTitle, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.sectionTitle} selectable={true}>
        {title}
      </Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </TouchableOpacity>
  ),
);

const MenuButton: React.FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <FontAwesomeIcon icon={faRightFromBracket} size={25} color={'white'} />
    </TouchableOpacity>
  );
};

const ProfileScreen = ({route}: {route: any}) => {
  const userData = route.params.userData;
  let displayName = null;
  if (userData.user.firstname === null) {
    displayName = 'Update your profile!';
  } else {
    displayName = `${userData.user.firstname} ${userData.user.lastname}`;
  }
  const username = `@${userData.user.username}`;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate(ScreenEnum.LOGIN);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleMenuPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Logout',
          onPress: () => {
            handleLogout();
          },
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const options = [
    {
      title: 'Profile Information',
      subTitle: 'Body measurements • User basic info',
      onPress: useCallback(() => {
        console.log('Profile clicked!');
        navigation.navigate(ScreenEnum.PROFILE, {
          userData: route.params.userData,
        });
      }, []),
    },
    {
      title: 'Language',
      subTitle: 'English • Hindi',
      onPress: useCallback(() => console.log('Language clicked!'), []),
    },
    {
      title: 'Security',
      subTitle: 'Change Password',
      onPress: useCallback(() => console.log('Security clicked!'), []),
    },
    {
      title: 'Help & Support',
      subTitle: 'Queries • FAQs • Contact Us',
      onPress: useCallback(() => console.log('Help clicked!'), []),
    },
    {
      title: 'Privacy Policy',
      subTitle: 'Know policies',
      onPress: useCallback(() => {
        console.log('Privacy clicked!');
        navigation.navigate(ScreenEnum.PRIVACY);
      }, []),
    },
  ];

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/profile-background.jpg')}
        style={styles.headerContainer}
        imageStyle={styles.backgroundImage}>
        <MenuButton onPress={handleMenuPress} />
        <ImageBackground
          source={require('../../assets/profile-pic.jpg')}
          style={styles.profilePicture}
          imageStyle={styles.profileImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>
            {displayName.length > 20
              ? `${displayName.substring(0, 20)}...`
              : displayName}
          </Text>
          <Text>{username}</Text>
        </View>
      </ImageBackground>
      <FlatList
        data={options}
        renderItem={({item}) => <ProfileOption {...item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.Body}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
