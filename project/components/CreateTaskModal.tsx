import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { X, Clock } from 'lucide-react-native';

interface Task {
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  startTime: string;
  endTime: string;
  category: 'daily' | 'today' | 'tomorrow';
}

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

export function CreateTaskModal({ visible, onClose, onCreateTask }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('12:00 PM');
  const [alertEnabled, setAlertEnabled] = useState(false);

  const handleCreateTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      completed: false,
      startTime,
      endTime,
      category: 'tomorrow',
    };

    onCreateTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStartTime('09:00 AM');
    setEndTime('12:00 PM');
    setAlertEnabled(false);
    
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create new task</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          {/* Date Range */}
          <View style={styles.dateRange}>
            <Text style={styles.dateText}>04 Mar - 11 Mar</Text>
          </View>

          {/* Calendar Placeholder */}
          <View style={styles.calendar}>
            <View style={styles.calendarRow}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <View key={day} style={styles.dayContainer}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <TouchableOpacity
                    style={[
                      styles.dayButton,
                      index === 2 && styles.selectedDay, // Wednesday selected
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNumber,
                        index === 2 && styles.selectedDayText,
                      ]}
                    >
                      {5 + index}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Schedule Section */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Schedule</Text>

            {/* Form Fields */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task name"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Time Selection */}
            <View style={styles.timeRow}>
              <View style={styles.timeGroup}>
                <Text style={styles.label}>Start Time</Text>
                <TouchableOpacity style={styles.timeButton}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.timeText}>{startTime}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.timeGroup}>
                <Text style={styles.label}>End Time</Text>
                <TouchableOpacity style={styles.timeButton}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.timeText}>{endTime}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Priority */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityButtons}>
                {(['High', 'Medium', 'Low'] as const).map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.priorityButton,
                      priority === level && styles.priorityButtonActive,
                    ]}
                    onPress={() => setPriority(level)}
                  >
                    <Text
                      style={[
                        styles.priorityButtonText,
                        priority === level && styles.priorityButtonTextActive,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Alert Toggle */}
            <View style={styles.alertRow}>
              <Text style={styles.alertLabel}>Get alert for this task</Text>
              <TouchableOpacity
                style={[styles.toggle, alertEnabled && styles.toggleActive]}
                onPress={() => setAlertEnabled(!alertEnabled)}
              >
                <View style={[styles.toggleThumb, alertEnabled && styles.toggleThumbActive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Create Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
            <Text style={styles.createButtonText}>Create Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateRange: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  calendar: {
    marginBottom: 32,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: '#A855F7',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  scheduleSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  timeGroup: {
    flex: 1,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  priorityButtonActive: {
    backgroundColor: '#A855F7',
    borderColor: '#A855F7',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  priorityButtonTextActive: {
    color: '#FFFFFF',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  alertLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#A855F7',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B7280',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  createButton: {
    backgroundColor: '#A855F7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});