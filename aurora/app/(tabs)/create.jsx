// app/(tabs)/create.jsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput} from 'react-native';
import { Image } from 'expo-image';
import Colors from '../../constants/Colors';
import styles from '../styles';
import authStyles from '@/app/(auth)/styles3';
import React, { useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Pick video file
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedVideo(result.assets[0]);
        console.log('Video selected:', result.assets[0].name);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'Failed to select video file');
    }
  };

  // Pick thumbnail image
  const pickThumbnail = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedThumbnail(result.assets[0]);
        console.log('Thumbnail selected:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking thumbnail:', error);
      Alert.alert('Error', 'Failed to select thumbnail image');
    }
  };

  // Submit and publish video
  const submitAndPublish = async () => {
    // Validation
    if (!videoTitle.trim()) {
      Alert.alert('Missing Title', 'Please enter a video title');
      return;
    }

    if (!selectedVideo) {
      Alert.alert('Missing Video', 'Please select a video file to upload');
      return;
    }

    if (!selectedThumbnail) {
      Alert.alert('Missing Thumbnail', 'Please select a thumbnail image');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process (replace with actual upload logic)
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success!', 
        `"${videoTitle}" has been uploaded successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setVideoTitle('');
              setSelectedVideo(null);
              setSelectedThumbnail(null);
              setAiPrompt('');
              
              // Navigate to home or profile
              router.push('/(tabs)/profile');
            }
          }
        ]
      );

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', 'There was an error uploading your video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140}}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 28,
            marginBottom: 10
          }}>
            Upload Video
          </Text>
        </View>

        {/* Video Title Section */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            Video Title
          </Text>
          
          <TextInput
            style={[authStyles.formInput, {
              fontFamily: 'PoppinsRegular',
              fontSize: 16,
              color: 'white'
            }]}
            placeholder="Give your video a catchy title..."
            placeholderTextColor="#666"
            value={videoTitle}
            onChangeText={setVideoTitle}
            multiline={false}
          />
        </View>

        {/* Upload Video Section */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            Upload Video
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selectedVideo ? Colors.primary : '#333',
              borderStyle: selectedVideo ? 'solid' : 'dashed',
              padding: 40,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200
            }}
            onPress={pickVideo}
          >
            {selectedVideo ? (
              <View style={{alignItems: 'center'}}>
                <Ionicons name="checkmark-circle" size={50} color={Colors.primary} />
                <Text style={{
                  color: Colors.primary,
                  fontFamily: 'PoppinsBold',
                  fontSize: 16,
                  marginTop: 10,
                  textAlign: 'center'
                }}>
                  Video Selected
                </Text>
                <Text style={{
                  color: '#888',
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: 'center'
                }}>
                  {selectedVideo.name}
                </Text>
                <Text style={{
                  color: Colors.primary,
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14,
                  marginTop: 10
                }}>
                  Tap to change video
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  backgroundColor: '#333',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15
                }}>
                  <Ionicons name="cloud-upload-outline" size={30} color={Colors.primary} />
                </View>
                <Text style={{
                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                  Select Video File
                </Text>
                <Text style={{
                  color: '#666',
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: 'center'
                }}>
                  Choose from your device
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Thumbnail Image Section */}
        <View style={{marginBottom: 30}}>
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            Thumbnail Image
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#333',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 120
            }}
            onPress={pickThumbnail}
          >
            {selectedThumbnail ? (
              <View style={{alignItems: 'center', width: '100%'}}>
                <Image 
                  source={selectedThumbnail.uri}
                  style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 8,
                    marginBottom: 10
                  }}
                  contentFit="cover"
                />
                <Text style={{
                  color: Colors.primary,
                  fontFamily: 'PoppinsRegular',
                  fontSize: 14
                }}>
                  Tap to change thumbnail
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="image-outline" size={24} color={Colors.primary} style={{marginRight: 10}} />
                <Text style={{
                  color: 'white',
                  fontFamily: 'PoppinsBold',
                  fontSize: 16
                }}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* AI Prompt Section */}
        <View style={{marginBottom: 40}}>
          <Text style={{
            color: 'white',
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            marginBottom: 15
          }}>
            AI Prompt
          </Text>
          
          <TextInput
            style={[authStyles.formInput, {
              fontFamily: 'PoppinsRegular',
              fontSize: 16,
              color: 'white',
              height: 100,
              textAlignVertical: 'top'
            }]}
            placeholder="The AI prompt of your video...."
            placeholderTextColor="#666"
            value={aiPrompt}
            onChangeText={setAiPrompt}
            multiline={true}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isUploading ? '#666' : Colors.primary,
            borderRadius: 12,
            padding: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}
          onPress={submitAndPublish}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="cloud-upload-outline" size={20} color="white" style={{marginRight: 10}} />
              <Text style={{
                color: 'white',
                fontFamily: 'PoppinsBold',
                fontSize: 18
              }}>
                Uploading...
              </Text>
            </View>
          ) : (
            <Text style={{
              color: 'white',
              fontFamily: 'PoppinsBold',
              fontSize: 18
            }}>
              Submit & Publish
            </Text>
          )}
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={{
          color: '#666',
          fontFamily: 'PoppinsRegular',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 20
        }}>
          By uploading, you agree to our terms of service and community guidelines. 
          Your video will be reviewed before publishing.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;