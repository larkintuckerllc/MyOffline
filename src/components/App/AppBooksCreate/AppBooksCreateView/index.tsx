import { FormikProps } from 'formik';
import React, { FC, useCallback } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export interface Values {
  author: string;
  title: string;
}
const BooksCreateView: FC<FormikProps<Values>> = ({
  handleChange,
  handleSubmit,
  isSubmitting,
  isValid,
  status,
  values: { author, title },
}) => {
  const handlePress = useCallback((): void => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <View>
      <TextInput
        editable={!isSubmitting}
        onChangeText={handleChange('author')}
        selectTextOnFocus={!isSubmitting}
        style={styles.rootInput}
        value={author}
      />
      <TextInput
        editable={!isSubmitting}
        onChangeText={handleChange('title')}
        selectTextOnFocus={!isSubmitting}
        style={styles.rootInput}
        value={title}
      />
      {status !== undefined && (
        <View style={styles.rootError}>
          <Text>Error Creating</Text>
        </View>
      )}
      <TouchableOpacity
        disabled={!isValid || isSubmitting}
        onPress={handlePress}
        style={[styles.rootSubmit, (!isValid || isSubmitting) && styles.rootSubmitDisabled]}
      >
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BooksCreateView;
