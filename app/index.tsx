import { Text, View, StyleSheet, ScrollView } from "react-native";
import Metric from "./components/Metric";
import Ring from "./components/RingProgress";
import useHealthData from "./hooks/useHealthData";
import HealthDataInput from './components/HealthDataInput';

export default function Index() {
  const healthData = useHealthData();

  const formatValue = (key: string, value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (key) {
      case 'distance':
        return `${(value / 1000).toFixed(2)} km`;
      case 'weight':
      case 'boneMass':
      case 'leanBodyMass':
      case 'bodyWaterMass':
        return `${value.toFixed(1)} kg`;
      case 'height':
        return `${value.toFixed(2)} m`;
      case 'bodyFat':
      case 'oxygenSaturation':
        return `${value.toFixed(1)}%`;
      case 'activeCalories':
      case 'totalCalories':
      case 'basalMetabolicRate':
        return `${value.toFixed(0)} kcal`;
      case 'heartRate':
      case 'restingHeartRate':
      case 'respiratoryRate':
        return `${value.toFixed(0)} bpm`;
      case 'bloodGlucose':
        return `${value.toFixed(1)} mg/dL`;
      case 'bloodPressureSystolic':
      case 'bloodPressureDiastolic':
        return `${value.toFixed(0)} mmHg`;
      case 'bodyTemperature':
      case 'basalBodyTemperature':
        return `${value.toFixed(1)}°C`;
      case 'vo2Max':
        return `${value.toFixed(1)} mL/kg/min`;
      case 'power':
        return `${value.toFixed(0)} watts`;
      case 'speed':
        return `${value.toFixed(1)} m/s`;
      case 'stepsCadence':
      case 'cyclingCadence':
        return `${value.toFixed(0)} rpm`;
      case 'exerciseSessions':
      case 'sleepSessions':
      case 'sexualActivity':
      case 'menstruationPeriods':
      case 'intermenstrualBleeding':
      case 'cervicalMucus':
      case 'ovulationTest':
        return value === 1 ? '1 session' : `${value} sessions`;
      default:
        return `${value.toFixed(0)}`;
    }
  };

  const metricLabels: { [key: string]: string } = {
    steps: 'Steps',
    distance: 'Distance',
    floorsClimbed: 'Floors',
    activeCalories: 'Active Calories',
    totalCalories: 'Total Calories',
    heartRate: 'Heart Rate',
    restingHeartRate: 'Resting HR',
    heartRateVariability: 'HRV',
    weight: 'Weight',
    height: 'Height',
    bodyFat: 'Body Fat',
    hydration: 'Hydration',
    boneMass: 'Bone Mass',
    leanBodyMass: 'Lean Mass',
    bodyWaterMass: 'Water Mass',
    bloodGlucose: 'Blood Glucose',
    bloodPressureSystolic: 'BP Systolic',
    bloodPressureDiastolic: 'BP Diastolic',
    bodyTemperature: 'Body Temp',
    basalBodyTemperature: 'Basal Temp',
    basalMetabolicRate: 'BMR',
    vo2Max: 'VO2 Max',
    respiratoryRate: 'Breathing Rate',
    oxygenSaturation: 'O2 Saturation',
    power: 'Power',
    speed: 'Speed',
    stepsCadence: 'Steps Cadence',
    cyclingCadence: 'Cycling Cadence',
    elevationGained: 'Elevation',
    wheelchairPushes: 'Wheelchair Pushes',
    exerciseSessions: 'Exercise Sessions',
    sleepSessions: 'Sleep Sessions',
    sexualActivity: 'Sexual Activity',
    menstruationPeriods: 'Menstruation',
    intermenstrualBleeding: 'Intermenstrual',
    cervicalMucus: 'Cervical Mucus',
    ovulationTest: 'Ovulation Tests'
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Step Goal is 10,000</Text>
      <Ring progress={healthData.steps ? healthData.steps / 10000 : 0} />
      
      {/* <HealthDataInput /> */}
      
      <View style={styles.metricsGrid}>
        {Object.entries(metricLabels).map(([key, label]) => (
          <View key={key} style={styles.metricContainer}>
            <Metric 
              label={label} 
              value={formatValue(key, healthData[key])} 
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  metricContainer: {
    width: '48%',
    marginBottom: 15,
  },
});