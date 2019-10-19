import React, { FC } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { failedQueriesRemoveAll, getFailedQueries } from '../../../store/ducks/failedQueries';
import styles from './styles';

const AppFailedQueries: FC = () => {
  const dispatch = useDispatch();
  const failedQueries = useSelector(getFailedQueries);
  const handlePress = (): void => {
    dispatch(failedQueriesRemoveAll());
  };

  return (
    <Modal visible={failedQueries.length !== 0}>
      <View style={styles.root}>
        <TouchableOpacity onPress={handlePress} style={styles.rootClose}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>TEST</Text>
      </View>
    </Modal>
  );
};

export default AppFailedQueries;
