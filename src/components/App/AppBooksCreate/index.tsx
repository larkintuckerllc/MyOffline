import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React, { FC } from 'react';
import {
  BOOKS_CREATE,
  BooksCreateData,
  BooksCreateVariables,
  handleBooksCreateUpdate,
} from '../../../graphql/books';
import AppBooksCreateView from './AppBooksCreateView';

interface ValidationError {
  author?: string;
  title?: string;
}

const AppBooksCreate: FC = () => {
  const [booksCreate] = useMutation<BooksCreateData, BooksCreateVariables>(BOOKS_CREATE, {
    update: handleBooksCreateUpdate,
  });

  return (
    <Formik
      component={AppBooksCreateView}
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
          setStatus('500');
        }
        setSubmitting(false);
      }}
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

export default AppBooksCreate;
