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

interface SkillData {
  id: string;
  name: string;
}

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills(old => [...old, data])
  } 

  function handleRemoveSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect (() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12){
      setGretting("Good morning")
    } else if (currentHour >= 12 && currentHour < 18){
      setGretting("Good afternoon")
    } else {
      setGretting("Good night")
    } 

  }, []) 

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Welcome, Jardel
      </Text>

      <Text style={styles.greetings}>
        {gretting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button 
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList 
        data={mySkills}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name}
            onPress = {() => handleRemoveSkill(item.id)}
          />
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