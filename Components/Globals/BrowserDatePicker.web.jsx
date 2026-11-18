import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

function formatDate(date) {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime())) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function BrowserDatePicker({ date, onSelect, onClose }) {
  const today = formatDate(new Date());

  function submit(event) {
    event.preventDefault();
    const [year, month, day] = event.currentTarget.elements.birthDate.value.split('-').map(Number);
    if (!year || !month || !day) return;
    const selected = new Date(0);
    selected.setFullYear(year, month - 1, day);
    selected.setHours(0, 0, 0, 0);
    onSelect(selected);
    onClose();
  }

  return (
    <Modal transparent visible onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.dialog} accessibilityRole="dialog" accessibilityLabel="Choose date of birth">
          <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
            <label htmlFor="shapeup-birth-date">Date of birth</label>
            <input autoFocus id="shapeup-birth-date" name="birthDate" type="date"
              defaultValue={formatDate(date)} max={today} required />
            <button type="submit">Use this date</button>
          </form>
          <Pressable accessibilityRole="button" onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0008', padding: 16 },
  dialog: { width: '100%', maxWidth: 360, backgroundColor: 'white', borderRadius: 12, padding: 24 },
  cancel: { marginTop: 16, textAlign: 'center' },
});
