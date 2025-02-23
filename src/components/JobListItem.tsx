import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface JobListItemProps {
  id: string;
  title: string;
  status?: 'Open' | 'In Progress' | 'Fulfilled';
  onPress: () => void;
}

const JobListItem: React.FC<JobListItemProps> = ({ id, title, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {status && <View style={[styles.statusBadge, styles[status]]}><Text style={styles.statusText}>{status}</Text></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  Open: {
    backgroundColor: '#FFA500',
  },
  'In Progress': {
    backgroundColor: '#4CAF50',
  },
  Fulfilled: {
    backgroundColor: '#2196F3',
  },
});

export default JobListItem;