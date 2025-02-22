import { View, Button, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useHealthDataWriter from '../hooks/useHealthDataWriter';

export default function HealthDataInput() {
  const [steps, setSteps] = useState('');
  const [weight, setWeight] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState('');

  const {
    writeSteps,
    writeWeight,
    writeHeartRate,
    writeBloodPressure,
    writeExerciseSession,
  } = useHealthDataWriter();

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Steps"
          value={steps}
          onChangeText={setSteps}
          keyboardType="numeric"
        />
        <Button
          title="Add Steps"
          onPress={() => writeSteps(parseInt(steps, 10))}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Button
          title="Add Weight"
          onPress={() => writeWeight(parseFloat(weight))}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Heart Rate (bpm)"
          value={heartRate}
          onChangeText={setHeartRate}
          keyboardType="numeric"
        />
        <Button
          title="Add Heart Rate"
          onPress={() => writeHeartRate(parseInt(heartRate, 10))}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Systolic"
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Diastolic"
          value={diastolic}
          onChangeText={setDiastolic}
          keyboardType="numeric"
        />
        <Button
          title="Add BP"
          onPress={() => writeBloodPressure(parseInt(systolic, 10), parseInt(diastolic, 10))}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Exercise Minutes"
          value={exerciseMinutes}
          onChangeText={setExerciseMinutes}
          keyboardType="numeric"
        />
        <Button
          title="Add Exercise"
          onPress={() => writeExerciseSession(parseInt(exerciseMinutes, 10))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
}); 