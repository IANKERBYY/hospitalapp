import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../../styles/theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { equipment, SEVERITY_LEVELS } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const CreateReportScreen = ({ route, navigation }) => {
  const { equipmentId } = route.params || {};
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    severity: '',
    image: null,
  });

  const selectedEquipment = equipment.find(e => e.id === equipmentId);

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to attach images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFormData(prev => ({
          ...prev,
          image: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please provide a description of the issue');
      return;
    }

    if (!formData.severity) {
      Alert.alert('Error', 'Please select the severity level');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would upload the image and send the report data to your backend
      
      navigation.goBack();
      // Optionally show success message
      Alert.alert('Success', 'Report submitted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {selectedEquipment && (
        <View style={styles.equipmentInfo}>
          <Image
            source={{ uri: selectedEquipment.image }}
            style={styles.equipmentImage}
          />
          <View style={styles.equipmentDetails}>
            <Input
              label="Equipment"
              value={selectedEquipment.name}
              disabled
            />
            <Input
              label="Department"
              value={selectedEquipment.department}
              disabled
            />
          </View>
        </View>
      )}

      <Input
        label="Description"
        placeholder="Describe the issue in detail..."
        value={formData.description}
        onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
        multiline
        numberOfLines={4}
      />

      <View style={styles.severityContainer}>
        <View style={styles.severityHeader}>
          <Ionicons name="warning-outline" size={20} color={COLORS.gray[600]} />
          <Input
            label="Severity Level"
            value={formData.severity}
            containerStyle={styles.severityInput}
            disabled
          />
        </View>
        <View style={styles.severityButtons}>
          {Object.values(SEVERITY_LEVELS).map((level) => (
            <Button
              key={level}
              title={level}
              variant={formData.severity === level ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setFormData(prev => ({ ...prev, severity: level }))}
              style={styles.severityButton}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImagePick}
      >
        {formData.image ? (
          <Image source={{ uri: formData.image }} style={styles.pickedImage} />
        ) : (
          <View style={styles.imagePickerContent}>
            <Ionicons name="camera-outline" size={32} color={COLORS.gray[400]} />
            <Button
              title="Add Photo"
              variant="outline"
              size="sm"
              style={styles.addPhotoButton}
            />
          </View>
        )}
      </TouchableOpacity>

      <Button
        title="Submit Report"
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  equipmentInfo: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  equipmentImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  equipmentDetails: {
    gap: SPACING.sm,
  },
  severityContainer: {
    marginBottom: SPACING.lg,
  },
  severityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  severityInput: {
    flex: 1,
  },
  severityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  severityButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  imagePickerButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  imagePickerContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  addPhotoButton: {
    marginTop: SPACING.sm,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
});

export default CreateReportScreen;
