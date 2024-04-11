import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
  },
  warningText: {
    marginLeft: 5,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    color: 'black',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orText: {
    width: 40,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  dob: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
  },
});
