import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ChevronLeft, ChevronRight, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const selectedTask = {
    title: 'Mobile App Research',
    description: 'Based on food app and see user flow and next direction if any',
    priority: 'High',
    startTime: '06:00 PM',
    endTime: '09:00 PM',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mobile App Research</Text>
          <TouchableOpacity>
            <MoreHorizontal size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Calendar Navigation */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth('next')}>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Days of Week */}
        <View style={styles.daysOfWeek}>
          {daysOfWeek.map(day => (
            <Text key={day} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          {getDaysInMonth(currentMonth).map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCell,
                date && isSelected(date) && styles.selectedDate,
                date && isToday(date) && !isSelected(date) && styles.todayDate,
              ]}
              onPress={() => date && setSelectedDate(date)}
              disabled={!date}
            >
              {date && (
                <Text
                  style={[
                    styles.dateText,
                    isSelected(date) && styles.selectedDateText,
                    isToday(date) && !isSelected(date) && styles.todayDateText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Schedule Section */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleTitle}>Schedule</Text>
          
          <View style={styles.taskDetail}>
            <Text style={styles.taskTitle}>{selectedTask.title}</Text>
            <Text style={styles.taskDescription}>{selectedTask.description}</Text>
            
            <View style={styles.taskMeta}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabel}>Start Time</Text>
                <Text style={styles.timeValue}>{selectedTask.startTime}</Text>
              </View>
              
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabel}>End Time</Text>
                <Text style={styles.timeValue}>{selectedTask.endTime}</Text>
              </View>
            </View>

            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Priority</Text>
              <View style={styles.priorityButtons}>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedTask.priority === 'High' && styles.priorityButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedTask.priority === 'High' && styles.priorityButtonTextActive,
                    ]}
                  >
                    High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedTask.priority === 'Medium' && styles.priorityButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedTask.priority === 'Medium' && styles.priorityButtonTextActive,
                    ]}
                  >
                    Medium
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedTask.priority === 'Low' && styles.priorityButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedTask.priority === 'Low' && styles.priorityButtonTextActive,
                    ]}
                  >
                    Low
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  dayOfWeek: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    width: 40,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  dateCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDate: {
    backgroundColor: '#A855F7',
    borderRadius: 8,
  },
  todayDate: {
    backgroundColor: '#2A1A3A',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayDateText: {
    color: '#A855F7',
    fontWeight: '600',
  },
  scheduleSection: {
    paddingHorizontal: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  taskDetail: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
    lineHeight: 20,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeContainer: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priorityContainer: {
    marginBottom: 32,
  },
  priorityLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#A855F7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#2A1A3A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A855F7',
  },
});