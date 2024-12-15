// import { View, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';

// const Portfolio = ({ worker }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Portfolio</Text>
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: worker?.portfolioImage1 }} style={styles.image} />
//         <Image source={{ uri: worker?.portfolioImage2 }} style={styles.image} />
//         <Image source={{ uri: worker?.portfolioImage3 }} style={styles.image} />
//         <Image source={{ uri: worker?.portfolioImage4 }} style={styles.image} />
//       </View>
//       <View style={styles.separator}/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   image: {
//     width: '48%',
//     height: 130,
//     marginBottom: 12,
//     borderRadius:15
//   },
//   separator: {
//     borderBottomColor: '#e0e0e0',
//     borderBottomWidth: 1,
//     marginVertical: 16,
//   },
// });

import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const Portfolio = ({ worker }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: worker?.portfolioImage1 }} style={styles.image} />
        <Image source={{ uri: worker?.portfolioImage2 }} style={styles.image} />
        <Image source={{ uri: worker?.portfolioImage3 }} style={styles.image} />
        <Image source={{ uri: worker?.portfolioImage4 }} style={styles.image} />
      </View>
      <View style={styles.separator}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '48%',
    height: 130,
    marginBottom: 12,
    borderRadius:15
  },
  separator: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});

export default Portfolio;