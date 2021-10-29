import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    setMySkills(old => [...old, newSkill])
  } 

  useEffect (() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12){
      setGreeting("Good morning")
    } else if (currentHour >= 12 && currentHour < 18){
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good night")
    } 

  }, []) 

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Welcome, Jardel
      </Text>

      <Text style={styles.greetings}>
        {greeting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill}/>

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList 
        data={mySkills}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <SkillCard skill={item}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 30,
    backgroundColor: '#121015'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#fff'
  }
})