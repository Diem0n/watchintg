import { Text, View, StyleSheet } from "react-native";
type MetricProps = {
    label: string;
    value: string;
  }
  const Metric = ({label, value}:MetricProps) =>{
    return (
      <View style={styles.metric} >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.values}>{value}</Text>
    </View>
    )
  }

  const styles = StyleSheet.create({
    
    metric: {
      justifyContent: 'center',
    marginBottom: 20
    }
    ,
    label: {
      fontSize: 16,
      fontWeight: '900'
    },
    values: {
        fontSize: 48,
        fontWeight: '900'
    }
  })

  export default Metric;