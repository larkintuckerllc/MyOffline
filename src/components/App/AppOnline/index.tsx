import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from '../../../store/ducks';
import { getOnline, setOnline } from '../../../store/ducks/online';
import styles from './styles';

const AppOnline: FC = () => {
  const dispatch = useDispatch<Dispatch<ActionType>>();
  const online = useSelector(getOnline);
  const handlePress = useCallback(() => {
    dispatch(setOnline(!online));
  }, [dispatch, online]);

  return (
    <View style={styles.root}>
      <Text>
        Online:
        {online ? 'True' : 'False'}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppOnline;
