import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getCarById } from '../../src/services/api';

type RootStackParamList = {
  CarDetail: { carId: string };
};

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, 'CarDetail'>;

const CarDetailScreen = () => {
  const route = useRoute<CarDetailScreenRouteProp>();
  const { carId } = route.params;

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarById(carId);
        setCar(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [carId]);

  const formattedDate = car?.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'N/A';

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>} {/* TODO: Replace with a proper spinner */}
      {error && <Text>Error: {error}</Text>}
      {car && !loading && !error && (
        <>
          <Text style={styles.carName}>{car.name}</Text>
          <Image source={{ uri: car.imageUrl }} style={styles.carImage} resizeMode="cover" />
          {car.transmission && <Text style={styles.transmission}>{car.transmission}</Text>}
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>{car.description}</Text>
          {car.tags && car.tags.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>SPECIFICATIONS</Text>
              <View style={styles.tagsContainer}>
                {car.tags.map((tag: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <Text style={styles.lastUpdated}>Last updated: {formattedDate}</Text>
          <TouchableOpacity style={styles.deleteIcon}>
            <Text>🗑️</Text> {/* Or use an actual icon component */}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex: 1 to take up available space
    position: 'relative', // Needed for absolute positioning of delete icon
    padding: 20, // Add padding around the content
    backgroundColor: '#fff', // Set a white background
  },
  carName: {
    fontSize: 24, // Large font size for the name
    fontWeight: 'bold', // Bold font weight
    marginBottom: 10, // Add some space below the name
  },
  carImage: {
    width: '100%', // Image takes the full width
    height: 200, // Fixed height for the image
    borderRadius: 8, // Slightly rounded corners for the image
    marginBottom: 10, // Add space below the image
  },
  transmission: {
    alignSelf: 'flex-start', // Align transmission to the left
    backgroundColor: '#e0e0e0', // Light gray background
    paddingVertical: 4, // Vertical padding
    paddingHorizontal: 8, // Horizontal padding
    borderRadius: 15, // Rounded corners for the pill shape
    fontSize: 12, // Smaller font size
    marginBottom: 10, // Add space below the transmission pill
  },
  sectionTitle: {
    fontSize: 16, // Font size for section titles
    fontWeight: 'bold', // Bold font weight
    marginTop: 15, // Space above the section title
    marginBottom: 5, // Space below the section title
  },
  description: {
    fontSize: 14, // Font size for description
    marginBottom: 15, // Space below the description
  },
  tagsContainer: {
    flexDirection: 'row', // Arrange tags horizontally
    flexWrap: 'wrap', // Allow tags to wrap to the next line
  },
  tag: {
    borderWidth: 1, // Add a border
    borderColor: '#d3d3d3', // Light gray border color
    borderRadius: 15, // Rounded corners for tag chips
    paddingVertical: 5, // Vertical padding
    paddingHorizontal: 10, // Horizontal padding
    marginRight: 5, // Space between tags
    marginBottom: 5, // Space below tags when they wrap
  },
  tagText: {
    fontSize: 12, // Smaller font size for tag text
  },
  lastUpdated: {
    fontSize: 12, // Smaller font size for last updated text
    color: '#888', // Gray color for less emphasis
    marginTop: 20, // Space above the last updated text
  },
  deleteIcon: {
    position: 'absolute', // Position the icon absolutely
    bottom: 20, // 20 units from the bottom
    right: 20, // 20 units from the right
    // Add more styling for size, padding, etc. if needed
  },
});

export default CarDetailScreen;