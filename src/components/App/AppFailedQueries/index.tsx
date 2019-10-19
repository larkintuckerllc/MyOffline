import React, { FC } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
        <ScrollView style={styles.rootFailedQueries}>
          {failedQueries.map(failedQuery => (
            <View key={failedQuery.id} style={styles.rootFailedQueriesQuery}>
              <Text>
                name:
                {failedQuery.name}
              </Text>
              <Text>
                variables:
                {failedQuery.variablesJSON}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AppFailedQueries;
