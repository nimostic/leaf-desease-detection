import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const faqData = [
  {
    question: "How to get the most accurate scan?",
    answer: "Ensure the leaf is well-lit and placed against a plain background. Keep the camera steady and focus on the affected area."
  },
  {
    question: "Which crops are supported?",
    answer: "Currently, we support Tomato, Potato, Corn, Mango, and Jackfruit leaf disease detection."
  },
  {
    question: "Can I use the app offline?",
    answer: "You can view your scan history offline, but a live internet connection is required for new disease analysis."
  },
  {
    question: "What should I do after detection?",
    answer: "Download the PDF report and consult with a local agricultural officer. The app provides general suggestions, not final prescriptions."
  }
];


const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);


  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{question}</Text>
        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#0B8457"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};


export default function FAQ() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#1C2D35',
    borderRadius: 15,
    marginVertical: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#0B8457',
    paddingLeft: 10,
  },
  itemContainer: {
    backgroundColor: '#263843',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  questionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  answerContainer: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: '#263843',
  },
  answerText: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 20,
  },
});
