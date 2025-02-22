import {
    initialize,
    requestPermission,
    readRecords,
  } from 'react-native-health-connect';
  import { Permission, RecordType } from 'react-native-health-connect/lib/typescript/types';
  import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
  import { useEffect , useState} from 'react';
  import { Platform } from 'react-native';

  type HealthData = {
    [key: string]: number | null;
  };

  const useHealthData = () => {
      
      const [androidPermissions, setAndroidPermissions] = useState<Permission[]>([]);
      const [healthData, setHealthData] = useState<HealthData>({});

  
      useEffect(() => {
      if (Platform.OS !== 'android') {
        return;
      }
  
      const init = async () => {
        // initialize the client
        const isInitialized = await initialize();
        if (!isInitialized) {
          console.log('Failed to initialize Health Connect');
          return;
        }
  
        // request permissions
        const grantedPermissions = await requestPermission([
            { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
            { accessType: 'read', recordType: 'BasalBodyTemperature' },
            { accessType: 'read', recordType: 'BasalMetabolicRate' },
            { accessType: 'read', recordType: 'BloodGlucose' },
            { accessType: 'read', recordType: 'BloodPressure' },
            { accessType: 'read', recordType: 'BodyFat' },
            { accessType: 'read', recordType: 'BodyTemperature' },
            { accessType: 'read', recordType: 'BodyWaterMass' },
            { accessType: 'read', recordType: 'BoneMass' },
            { accessType: 'read', recordType: 'CervicalMucus' },
            { accessType: 'read', recordType: 'CyclingPedalingCadence' },
            { accessType: 'read', recordType: 'Distance' },
            { accessType: 'read', recordType: 'ElevationGained' },
            { accessType: 'read', recordType: 'ExerciseSession' },
            { accessType: 'read', recordType: 'FloorsClimbed' },
            { accessType: 'read', recordType: 'HeartRate' },
            { accessType: 'read', recordType: 'HeartRateVariabilityRmssd' },
            { accessType: 'read', recordType: 'Height' },
            { accessType: 'read', recordType: 'Hydration' },
            { accessType: 'read', recordType: 'LeanBodyMass' },
            { accessType: 'read', recordType: 'IntermenstrualBleeding' },
            { accessType: 'read', recordType: 'MenstruationPeriod' },
            { accessType: 'read', recordType: 'Nutrition' },
            { accessType: 'read', recordType: 'OvulationTest' },
            { accessType: 'read', recordType: 'OxygenSaturation' },
            { accessType: 'read', recordType: 'Power' },
            { accessType: 'read', recordType: 'RespiratoryRate' },
            { accessType: 'read', recordType: 'RestingHeartRate' },
            { accessType: 'read', recordType: 'SexualActivity' },
            { accessType: 'read', recordType: 'SleepSession' },
            { accessType: 'read', recordType: 'Speed' },
            { accessType: 'read', recordType: 'Steps' },
            { accessType: 'read', recordType: 'StepsCadence' },
            { accessType: 'read', recordType: 'TotalCaloriesBurned' },
            { accessType: 'read', recordType: 'Vo2Max' },
            { accessType: 'read', recordType: 'Weight' },
            { accessType: 'read', recordType: 'WheelchairPushes' },

            // Write permissions
            { accessType: 'write', recordType: 'ActiveCaloriesBurned' },
            { accessType: 'write', recordType: 'BasalBodyTemperature' },
            { accessType: 'write', recordType: 'BasalMetabolicRate' },
            { accessType: 'write', recordType: 'BloodGlucose' },
            { accessType: 'write', recordType: 'BloodPressure' },
            { accessType: 'write', recordType: 'BodyFat' },
            { accessType: 'write', recordType: 'BodyTemperature' },
            { accessType: 'write', recordType: 'BodyWaterMass' },
            { accessType: 'write', recordType: 'BoneMass' },
            { accessType: 'write', recordType: 'CervicalMucus' },
            { accessType: 'write', recordType: 'CyclingPedalingCadence' },
            { accessType: 'write', recordType: 'Distance' },
            { accessType: 'write', recordType: 'ElevationGained' },
            { accessType: 'write', recordType: 'ExerciseSession' },
            { accessType: 'write', recordType: 'FloorsClimbed' },
            { accessType: 'write', recordType: 'HeartRate' },
            { accessType: 'write', recordType: 'HeartRateVariabilityRmssd' },
            { accessType: 'write', recordType: 'Height' },
            { accessType: 'write', recordType: 'Hydration' },
            { accessType: 'write', recordType: 'LeanBodyMass' },
            { accessType: 'write', recordType: 'IntermenstrualBleeding' },
            { accessType: 'write', recordType: 'MenstruationPeriod' },
            { accessType: 'write', recordType: 'Nutrition' },
            { accessType: 'write', recordType: 'OvulationTest' },
            { accessType: 'write', recordType: 'OxygenSaturation' },
            { accessType: 'write', recordType: 'Power' },
            { accessType: 'write', recordType: 'RespiratoryRate' },
            { accessType: 'write', recordType: 'RestingHeartRate' },
            { accessType: 'write', recordType: 'SexualActivity' },
            { accessType: 'write', recordType: 'SleepSession' },
            { accessType: 'write', recordType: 'Speed' },
            { accessType: 'write', recordType: 'Steps' },
            { accessType: 'write', recordType: 'StepsCadence' },
            { accessType: 'write', recordType: 'TotalCaloriesBurned' },
            { accessType: 'write', recordType: 'Vo2Max' },
            { accessType: 'write', recordType: 'Weight' },
            { accessType: 'write', recordType: 'WheelchairPushes' },
        ]);
  
        setAndroidPermissions(grantedPermissions);
      };
  
      init();

    }, []);
    
    const hasAndroidPermission = (recordType: string) => {
        return androidPermissions.some((perm) => perm.recordType === recordType);
    };
    
    useEffect(() => {
        const getHealthData = async () => {
          const today = new Date();
          const timeRangeFilter: TimeRangeFilter = {
            operator: 'between',
            startTime: new Date(today.getTime() - 86400000).toISOString(),
            endTime: today.toISOString(),
          };
      
          const newHealthData: HealthData = {};
      
          const readMetric = async (recordType: RecordType, valueExtractor: (record: any) => number) => {
            if (!hasAndroidPermission(recordType)) return null;
            try {
              const records = await readRecords(recordType, { timeRangeFilter });
              return records.records.reduce((sum: number, record: any) => sum + valueExtractor(record), 0);
            } catch (error) {
              console.error(`Error reading ${recordType}:`, error);
              return null;
            }
          };
      
          // Read all metrics
          newHealthData.steps = await readMetric('Steps', (record) => record.count);
          newHealthData.distance = await readMetric('Distance', (record) => record.distance.inMeters);
          newHealthData.floorsClimbed = await readMetric('FloorsClimbed', (record) => record.floors);
          newHealthData.activeCalories = await readMetric('ActiveCaloriesBurned', (record) => record.energy.inKilocalories);
          newHealthData.totalCalories = await readMetric('TotalCaloriesBurned', (record) => record.energy.inKilocalories);
          newHealthData.heartRate = await readMetric('HeartRate', (record) => record.beatsPerMinute);
          newHealthData.restingHeartRate = await readMetric('RestingHeartRate', (record) => record.beatsPerMinute);
          newHealthData.heartRateVariability = await readMetric('HeartRateVariabilityRmssd', (record) => record.heartRateVariabilityMillis);
          newHealthData.weight = await readMetric('Weight', (record) => record.weight.inKilograms);
          newHealthData.height = await readMetric('Height', (record) => record.height.inMeters);
          newHealthData.bodyFat = await readMetric('BodyFat', (record) => record.percentage);
          newHealthData.hydration = await readMetric('Hydration', (record) => record.volume.inLiters);
          newHealthData.boneMass = await readMetric('BoneMass', (record) => record.mass.inKilograms);
          newHealthData.leanBodyMass = await readMetric('LeanBodyMass', (record) => record.mass.inKilograms);
          newHealthData.bodyWaterMass = await readMetric('BodyWaterMass', (record) => record.mass.inKilograms);
          newHealthData.bloodGlucose = await readMetric('BloodGlucose', (record) => record.level.inMilligramsPerDeciliter);
          newHealthData.bloodPressureSystolic = await readMetric('BloodPressure', (record) => record.systolic.inMillimetersOfMercury);
          newHealthData.bloodPressureDiastolic = await readMetric('BloodPressure', (record) => record.diastolic.inMillimetersOfMercury);
          newHealthData.bodyTemperature = await readMetric('BodyTemperature', (record) => record.temperature.inCelsius);
          newHealthData.basalBodyTemperature = await readMetric('BasalBodyTemperature', (record) => record.temperature.inCelsius);
          newHealthData.basalMetabolicRate = await readMetric('BasalMetabolicRate', (record) => record.basalMetabolicRate.inKilocaloriesPerDay);
          newHealthData.vo2Max = await readMetric('Vo2Max', (record) => record.vo2MillilitersPerMinuteKilogram);
          newHealthData.respiratoryRate = await readMetric('RespiratoryRate', (record) => record.rate);
          newHealthData.oxygenSaturation = await readMetric('OxygenSaturation', (record) => record.percentage);
          newHealthData.power = await readMetric('Power', (record) => record.power.inWatts);
          newHealthData.speed = await readMetric('Speed', (record) => record.speed.inMetersPerSecond);
          newHealthData.stepsCadence = await readMetric('StepsCadence', (record) => record.rate);
          newHealthData.cyclingCadence = await readMetric('CyclingPedalingCadence', (record) => record.rate);
          newHealthData.elevationGained = await readMetric('ElevationGained', (record) => record.elevation.inMeters);
          newHealthData.wheelchairPushes = await readMetric('WheelchairPushes', (record) => record.count);
      
          // Add these session-based metrics
          const readSessionMetric = async (recordType: RecordType) => {
            if (!hasAndroidPermission(recordType)) return null;
            try {
              const records = await readRecords(recordType, { timeRangeFilter });
              return records.records.length; // Return count of sessions
            } catch (error) {
              console.error(`Error reading ${recordType}:`, error);
              return null;
            }
          };

          newHealthData.exerciseSessions = await readSessionMetric('ExerciseSession');
          newHealthData.sleepSessions = await readSessionMetric('SleepSession');
          newHealthData.sexualActivity = await readSessionMetric('SexualActivity');
          newHealthData.menstruationPeriods = await readSessionMetric('MenstruationPeriod');
          newHealthData.intermenstrualBleeding = await readSessionMetric('IntermenstrualBleeding');
          newHealthData.cervicalMucus = await readSessionMetric('CervicalMucus');
          newHealthData.ovulationTest = await readSessionMetric('OvulationTest');
      
          setHealthData(newHealthData);
        };
      
        getHealthData();

      }, [androidPermissions]);

      return healthData;
  }

  export default useHealthData;