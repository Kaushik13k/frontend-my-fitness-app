import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerOptions: {
    fontWeight: 'bold',
    color: 'blue',
    padding: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'black',
    padding: 15,
  },
  input: {
    height: 40,
    marginTop: 0,
    color: 'black',
  },
  container: {
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    color: 'black',
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
