import {StyleSheet} from 'react-native';
import Colors from '@/constants/Colors';

const styles2 = StyleSheet.create({
    // Your existing styles (kept exactly the same)
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: '20%',
    },

    text1: {
        color: Colors.text,
        fontFamily: 'PoppinsBold',
        fontSize: 20
    },

    text2: {
        color: Colors.white,
        fontFamily: 'SemiBold',
        fontSize: 24
    },

    tabBar: {
        backgroundColor: '#1a1a1a', // Dark background
        borderTopWidth: 0,
        height: 90, // Increased height for better spacing
        paddingBottom: 20, // More bottom padding
        paddingTop: 15, // More top padding
        paddingHorizontal: 10, // Side padding
    },

    // NEW PROFESSIONAL ADDITIONS
    // Professional container for better content layout
    professionalContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20, // Professional side margins
        paddingTop: 10, // Top spacing
    },

    // Content wrapper with proper spacing
    contentWrapper: {
        flex: 1,
    },

    // List container with bottom margin for tab bar
    listContainer: {
        flex: 1,
        marginBottom: 120, // Extra space for the tab bar (100px + 20px margin)
    },

    // Professional tab bar styling (enhanced version)
    professionalTabBar: {
        backgroundColor: '#000000',
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        height: 100, // Increased height for more padding
        paddingBottom: 30, // More bottom padding
        paddingTop: 15, // More top padding
        paddingHorizontal: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowOpacity: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0,
    },

    // Tab item styling for equal distribution
    tabBarItem: {
        height: 85, // Increased height for better spacing
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, // Equal width distribution
        paddingHorizontal: 5, // Small horizontal padding
    },

    // Header section styling
    headerSection: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10,
    },

    // Search section styling
    searchSection: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: Colors.background2, 
        borderRadius: 8,
        paddingRight: 20, 
        marginTop: 30,
        marginBottom: 30,
    },

    // Popular videos section
    popularVideosSection: {
        marginVertical: 30,
    },

    // Movie item container
    movieItemContainer: {
        marginVertical: 20,
    },

    // Movie image styling - BACK TO ORIGINAL DESIGN
    movieImage: {
        width: '100%', 
        height: 500, // Your original tall image height
        borderRadius: 8,
        backgroundColor: '#333', // Background for loading state
    },

    // Movie info container
    movieInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginTop: 20,
        alignItems: 'flex-start',
    },

    // Movie title styling
    movieTitle: {
        color: 'white', 
        fontFamily: 'PoppinsBold', 
        fontSize: 20,
        flex: 1,
        marginRight: 10,
    },

    // Movie rating styling
    movieRating: {
        color: Colors.primary, 
        fontFamily: 'SemiBold',
        fontSize: 16,
    },

    // Movie description styling
    movieDescription: {
        color: 'white', 
        fontFamily: 'SemiBold', 
        textAlign: 'justify',
        marginTop: 10,
        lineHeight: 22, // Better line spacing for readability
    },

    // Loading indicator container
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },

    // ========== NEW PROFESSIONAL MOVIE CARD STYLES ==========
    
    // Professional horizontal movie card container
    professionalMovieCard: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 0, // No horizontal margin since container has padding
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#333', // Subtle border for definition
    },

    // Image container with proper sizing and placeholder
    imageContainer: {
        width: 80,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#333', // Placeholder color while loading
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures border radius is respected
    },

    // Professional movie image styling
    professionalMovieImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },

    // Content area next to the image
    professionalMovieContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },

    // Professional movie title
    professionalMovieTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'PoppinsBold',
        marginBottom: 6,
        lineHeight: 20,
    },

    // Row for rating and year
    professionalRatingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6,
    },

    // Professional rating styling
    professionalRating: {
        fontSize: 14,
        color: '#FFD700', // Gold color for rating
        fontFamily: 'PoppinsRegular',
        fontWeight: '500',
    },

    // Year styling
    professionalYear: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'PoppinsRegular',
    },

    // Professional description
    professionalDescription: {
        fontSize: 13,
        color: '#ccc',
        lineHeight: 18,
        fontFamily: 'PoppinsRegular',
        marginTop: 4,
        opacity: 0.9, // Slightly transparent for hierarchy
    },

    // Alternative grid layout styles (if you want to try grid later)
    gridMovieCard: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        margin: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#333',
    },

    gridMovieImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#333',
    },

    gridMovieTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
        fontFamily: 'PoppinsBold',
    },

    gridMovieRating: {
        fontSize: 12,
        color: '#FFD700',
        fontFamily: 'PoppinsRegular',
    },
});

export default styles2;