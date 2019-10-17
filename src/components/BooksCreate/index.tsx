import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BOOKS_CREATE, BooksCreateData, BooksCreateVariables } from '../../graphql/books';

interface ValidationError {
  author?: string;
  title?: string;
}

const BooksCreate: FC = () => {
  const [booksCreate] = useMutation<BooksCreateData, BooksCreateVariables>(BOOKS_CREATE);

  return (
    <Formik
      initialValues={{ author: '', title: '' }}
      onSubmit={async (
        { author, title },
        { resetForm, setStatus, setSubmitting }
      ): Promise<void> => {
        setStatus(undefined);
        try {
          await booksCreate({
            variables: {
              author,
              title,
            },
          });
          resetForm();
        } catch (err) {
          setSubmitting(false);
          setStatus('500');
        }
      }}
      render={({
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        status,
        values: { author, title },
      }): JSX.Element => (
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
            onPress={handleSubmit}
            style={[styles.rootSubmit, (!isValid || isSubmitting) && styles.rootSubmitDisabled]}
          >
            <Text>Create</Text>
          </TouchableOpacity>
        </View>
      )}
      validate={({ author, title }): object => {
        const errors: ValidationError = {};
        if (author.trim() === '') {
          errors.author = 'Must not be blank';
        }
        if (title.trim() === '') {
          errors.title = 'Must not be blank';
        }
        return errors;
      }}
    />
  );
};

export default BooksCreate;
