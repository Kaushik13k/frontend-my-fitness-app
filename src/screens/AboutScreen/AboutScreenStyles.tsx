import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  profileImage: {
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '55%',
    resizeMode: 'cover',
  },
  profilePicture: {
    position: 'absolute',
    width: 150,
    height: 150,
    top: '23%',
    marginTop: 50,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  nameContainer: {
    top: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    marginLeft: 20,
    marginRight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    marginBottom: 22,
  },
  menuButton: {
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
});
