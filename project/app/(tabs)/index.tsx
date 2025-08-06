import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Search, Plus, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { TaskCard } from '@/components/TaskCard';
import { ProgressBar } from '@/components/ProgressBar';
import { CreateTaskModal } from '@/components/CreateTaskModal';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  startTime: string;
  endTime: string;
  category: 'daily' | 'today' | 'tomorrow';
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Mobile App Research',
      description: 'Research competitor apps and market trends',
      priority: 'High',
      completed: true,
      startTime: '06:00 PM',
      endTime: '09:00 PM',
      category: 'today',
    },
    {
      id: '2',
      title: 'Prepare Wireframe for Main Flow',
      description: 'Create detailed wireframes for user journey',
      priority: 'Medium',
      completed: false,
      startTime: '10:00 AM',
      endTime: '02:00 PM',
      category: 'today',
    },
    {
      id: '3',
      title: 'Prepare Screens',
      description: 'Design all required screens',
      priority: 'Medium',
      completed: false,
      startTime: '03:00 PM',
      endTime: '05:00 PM',
      category: 'today',
    },
    {
      id: '4',
      title: 'Website Research',
      description: 'Analyze competitor websites',
      priority: 'Low',
      completed: false,
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      category: 'tomorrow',
    },
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const todayTasks = tasks.filter(task => task.category === 'today');
  const tomorrowTasks = tasks.filter(task => task.category === 'tomorrow');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>You have got {tasks.length} tasks</Text>
            <Text style={styles.subGreeting}>today to complete ✨</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Task Here"
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>Progress</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Daily Task</Text>
            <Text style={styles.progressSubtitle}>
              {completedTasks}/{totalTasks} Task Completed
            </Text>
            <Text style={styles.progressDescription}>
              You are almost close to your goal
            </Text>
            <ProgressBar progress={progressPercentage} />
            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Task</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {todayTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={() => toggleTaskCompletion(task.id)}
            />
          ))}
        </View>

        {/* Tomorrow Tasks */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tomorrow Task</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {tomorrowTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={() => toggleTaskCompletion(task.id)}
            />
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <Plus size={24} color="#A855F7" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Create Task Modal */}
      <CreateTaskModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreateTask={addTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAll: {
    fontSize: 14,
    color: '#A855F7',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  progressDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A855F7',
    textAlign: 'right',
    marginTop: 8,
  },
  tasksSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A1A3A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 16,
  },
});