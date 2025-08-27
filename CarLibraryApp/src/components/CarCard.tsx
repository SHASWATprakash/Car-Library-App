import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Added TouchableOpacity


interface Car {
  id: string; // Assuming id is a string, adjust if it's a number
  name: string;
  transmission: string;
  imageUrl: string;
  description: string;
}
interface CarCardProps {
  car: Car;
  // Refined navigation type for better type safety
  navigation: any; // Using 'any' for now as requested, will refine with proper typing later
}

const CarCard: React.FC<CarCardProps> = ({ car,  }) => {
  return ( 
    <TouchableOpacity style={styles.container} >
      <Image
        style={styles.image}
        source={{ uri: car.imageUrl }}
        resizeMode="cover"
      />
      <Text style={styles.name}>{car.name}</Text> 
      <Text style={styles.transmission}>Transmission: {car.transmission}</Text>
      <Text style={styles.description}>{car.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc', 
    padding: 8,
    margin: 5,
    borderRadius: 5,
    width: '48%', // Adjusted for grid layout
    marginHorizontal: '1%', // Added horizontal margin
  },
  
  image: {
    width: '100%',
    height: 100, // Example height
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transmission: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#333',
  }
});

export default CarCard;