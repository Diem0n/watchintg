import { insertRecords } from 'react-native-health-connect';
import { useCallback } from 'react';

const useHealthDataWriter = () => {
  const writeSteps = useCallback(async (count: number) => {
    try {
      const time = new Date();
      const result = await insertRecords([{
        recordType: 'Steps',
        count,
        startTime: new Date(time.getTime() - 86400).toISOString(), // 24 hours
        endTime: time.toISOString(),
      }]);
      console.log('Steps written:', result);
      return true;
    } catch (error) {
      console.error('Error writing steps:', error);
      return false;
    }
  }, []);

  const writeWeight = useCallback(async (weightKg: number) => {
    try {
      const result = await insertRecords([{
        recordType: 'Weight',
        weight: { value: weightKg, unit: 'kilograms' },
        time: new Date().toISOString(),
      }]);
      console.log('Weight written:', result);
      return true;
    } catch (error) {
      console.error('Error writing weight:', error);
      return false;
    }
  }, []);

  const writeHeartRate = useCallback(async (bpm: number) => {
    try {
      const time = new Date();
      const result = await insertRecords([{
        recordType: 'HeartRate',
        startTime: new Date(time.getTime() - 1000).toISOString(), // 1 second ago
        endTime: time.toISOString(),
        samples: [{ 
          beatsPerMinute: bpm,
          time: time.toISOString()
        }]
      }]);
      console.log('Heart rate written:', result);
      return true;
    } catch (error) {
      console.error('Error writing heart rate:', error);
      return false;
    }
  }, []);

  const writeBloodPressure = useCallback(async (systolic: number, diastolic: number) => {
    try {
      const result = await insertRecords([{
        recordType: 'BloodPressure',
        systolic: { value: systolic, unit: 'millimetersOfMercury' },
        diastolic: { value: diastolic, unit: 'millimetersOfMercury' },
        time: new Date().toISOString(),
        bodyPosition: 1, // 1 represents 'sitting'
        measurementLocation: 1 // 1 represents 'left_arm'
      }]);
      console.log('Blood pressure written:', result);
      return true;
    } catch (error) {
      console.error('Error writing blood pressure:', error);
      return false;
    }
  }, []);

  const writeExerciseSession = useCallback(async (minutes: number, title: string = 'Workout') => {
    try {
      const startTime = new Date(Date.now() - minutes * 60 * 1000);
      const endTime = new Date();
      const result = await insertRecords([{
        recordType: 'ExerciseSession',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        exerciseType: 1, // 1 represents 'other_workout'
        title,
      }]);
      console.log('Exercise session written:', result);
      return true;
    } catch (error) {
      console.error('Error writing exercise session:', error);
      return false;
    }
  }, []);

  return {
    writeSteps,
    writeWeight,
    writeHeartRate,
    writeBloodPressure,
    writeExerciseSession,
  };
};

export default useHealthDataWriter; 