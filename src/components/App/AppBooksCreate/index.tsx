import { useMutation } from '@apollo/react-hooks';
import { Formik, FormikActions, FormikErrors } from 'formik';
import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import uuidv4 from 'uuid/v4';
import {
  BOOKS_CREATE,
  BooksCreateData,
  booksCreateOptimistic,
  BooksCreateVariables,
  handleBooksCreateUpdate,
} from '../../../graphql/books';
import { getOnline } from '../../../store/ducks/online';
import AppBooksCreateView, { Values } from './AppBooksCreateView';

interface ValidationError {
  author?: string;
  title?: string;
}

const validate = ({ author, title }: Values): FormikErrors<Values> => {
  const errors: ValidationError = {};
  if (author.trim() === '') {
    errors.author = 'Must not be blank';
  }
  if (title.trim() === '') {
    errors.title = 'Must not be blank';
  }
  return errors;
};

const AppBooksCreate: FC = () => {
  const online = useSelector(getOnline);
  const [booksCreate] = useMutation<BooksCreateData, BooksCreateVariables>(BOOKS_CREATE, {
    update: handleBooksCreateUpdate,
  });
  const handleSubmit = useCallback(
    async (
      { author, title }: Values,
      { resetForm, setStatus, setSubmitting }: FormikActions<Values>
    ): Promise<void> => {
      setStatus(undefined);
      const id = uuidv4();
      const book = {
        author,
        id,
        title,
      };
      try {
        await booksCreate({
          optimisticResponse: booksCreateOptimistic(book),
          variables: book,
        });
        resetForm();
      } catch (err) {
        setStatus('500');
      }
      setSubmitting(false);
    },
    []
  );

  return (
    <Formik
      component={AppBooksCreateView}
      initialValues={{ author: '', title: '' }}
      onSubmit={handleSubmit}
      validate={validate}
    />
  );
};

export default AppBooksCreate;
