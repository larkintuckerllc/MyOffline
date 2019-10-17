import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rootInput: {
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    padding: 10,
  },
  rootSubmit: {
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 40,
    padding: 10,
  },
  rootSubmitDisabled: {
    backgroundColor: 'gray',
  },
  rootError: {
    alignItems: 'center',
    backgroundColor: 'pink',
    height: 40,
    justifyContent: 'center',
    marginTop: 40,
    padding: 10,
  },
});
