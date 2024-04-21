import {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function BodyFigureButton({title, selectedButton, setSelectedButton}) {
  const isSelected = selectedButton === title;
  useEffect(() => {
    if (isSelected) {
      console.log(title);
    }
  }, [title, isSelected]);

  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={() => {
        console.log(title);
        setSelectedButton(title);
      }}>
      <Text style={isSelected ? styles.selectedButtonText : styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default BodyFigureButton;

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: '#ffcc02',
    borderBlockColor: 'black',
    borderWidth: 1,
  },
  selectedButtonText: {
    color: 'black',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#1A1A1A',
    opacity: 0.8,
    padding: 8,
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
