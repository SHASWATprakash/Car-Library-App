import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getCars } from '../services/api';
// @ts-ignore comment
import CarCard from '../../src/components/CarCard';
import SortingOptionsSheet from '../../src/components/SortingOptionsSheet';

const CarListScreen: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [isSortingSheetVisible, setIsSortingSheetVisible] = useState<boolean>(false);

  const handleSelectSort = (selectedSortBy: string, selectedSortOrder: string) => {
    setSortBy(selectedSortBy);
    setSortOrder(selectedSortOrder);
    setIsSortingSheetVisible(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars(sortBy, sortOrder);
        setCars(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [sortBy, sortOrder]);

  return ( 
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
        ) : error ? (
        <Text>Error: {error}</Text>
        ) : (
          <>
          <TouchableOpacity onPress={() => setIsSortingSheetVisible(true)}>
 <Text style={styles.sortIcon}>⇅</Text>
          </TouchableOpacity>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}

          data={cars}
          renderItem={({ item }) => <CarCard car={item} navigation={undefined}  />}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} // Assuming each car has a unique 'id'
        />
          <SortingOptionsSheet
            isVisible={isSortingSheetVisible}
            onClose={() => setIsSortingSheetVisible(false)}
            onSelectSort={handleSelectSort}
          />
 </>
      )}
 </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  sortIcon: {
    fontSize: 24,
    padding: 10,
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 5, // Add some horizontal padding to the FlatList
  }
});

export default CarListScreen;