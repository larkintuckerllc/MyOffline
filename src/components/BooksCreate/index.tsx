import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { BOOKS_CREATE, BooksCreateData, BooksCreateVariables } from '../../graphql/books';
import BooksCreateView from './BooksCreateView';

interface ValidationError {
  author?: string;
  title?: string;
}

const BooksCreate: FC = () => {
  const [booksCreate] = useMutation<BooksCreateData, BooksCreateVariables>(BOOKS_CREATE);

  return (
    <Formik
      component={BooksCreateView}
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
