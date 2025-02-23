import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import JobListItem from '../components/JobListItem';
import CreateJobButton from '../components/CreateJobButton';

type RootStackParamList = {
  Home: undefined;
  CreateJob: undefined;
  PendingJobForm: { jobId: string };
  JobInfo: { jobId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleCreateJob = () => {
    navigation.navigate('CreateOpportunity');
  };

  const handlePendingJobPress = (jobId: string) => {
    navigation.navigate('PendingJobForm', { jobId });
  };

  const handleSubmittedJobPress = (jobId: string) => {
    navigation.navigate('JobInfo', { jobId });
  };

  // Mock data for pending and submitted jobs
  const pendingJobs = [
    { id: 'p1', title: 'New Solar Installation' },
    { id: 'p2', title: 'Solar Panel Upgrade' },
  ];

  const submittedJobs = [
    { id: 's1', title: 'Residential Solar Project', status: 'Open' },
    { id: 's2', title: 'Commercial Solar Installation', status: 'In Progress' },
    { id: 's3', title: 'Solar Maintenance', status: 'Fulfilled' },
  ];

  return (
    <View style={styles.container}>
      <CreateJobButton onPress={handleCreateJob} />

      <Text style={styles.sectionTitle}>Pending Submission Queue</Text>
      <FlatList
        data={pendingJobs}
        renderItem={({ item }) => (
          <JobListItem
            id={item.id}
            title={item.title}
            onPress={() => handlePendingJobPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Text style={styles.sectionTitle}>Submitted Queue</Text>
      <FlatList
        data={submittedJobs}
        renderItem={({ item }) => (
          <JobListItem
            id={item.id}
            title={item.title}
            status={item.status as 'Open' | 'In Progress' | 'Fulfilled'}
            onPress={() => handleSubmittedJobPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
});

export default HomeScreen;