import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

interface SortingOptionsSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

const SortingOptionsSheet: React.FC<SortingOptionsSheetProps> = ({ isVisible, onClose, onSelectSort }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
 <View style={{ flex: 1 }} /> {/* This view acts as the overlay backdrop */}
 </TouchableWithoutFeedback>
        <View style={styles.sheetContent}>
          <TouchableOpacity style={styles.optionRow} onPress={() => { onSelectSort('name', 'asc'); onClose(); }}>
            <Text style={styles.optionText}>Sort by A - Z ↓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow} onPress={() => { onSelectSort('name', 'desc'); onClose(); }}>
             {/* Assuming Z-A would also use 'name' and 'desc' */}
            <Text style={styles.optionText}>Sort by Z - A ↑</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.optionRow} onPress={() => { onSelectSort('createdAt', 'desc'); onClose(); }}>
            <Text style={styles.optionText}>Sort by Date Modified ↑</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.optionRow} onPress={() => { onSelectSort('createdAt', 'asc'); onClose(); }}>
             {/* Assuming Oldest would also use 'createdAt' and 'asc' */}
          <Text style={styles.optionText}>Sort by Date Modified ↓</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  optionRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
  },
});

export default SortingOptionsSheet;