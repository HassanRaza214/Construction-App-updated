import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../configs/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/WorkerDetail/Intro";
import Stats from "../../components/WorkerDetail/Stats";
import About from "../../components/WorkerDetail/About";
import Portfolio from "../../components/WorkerDetail/Portfolio";
import Reviews from "../../components/WorkerDetail/Reviews";

export default function workerdetails() {
  const { workerid } = useLocalSearchParams();
  const [worker,setWorker]=useState({});
  const [loading,setLoading]=useState();

  useEffect(() => {
    GetWorkerdetailById();
  }, []);

  //used to get worker detail by id
  const GetWorkerdetailById = async () => {
    setLoading(true)
    const docRef = doc(db, "WorkersList", workerid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setWorker({id:docSnap.id,...docSnap.data()})
      setLoading(false)
    } else {
      console.log("No such document!");
    }
  };
  return (
    <View>
      {loading?
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      />:
      <ScrollView>
        <Intro worker={worker}/>
        <Stats worker={worker}/>
        <About worker={worker}/>
        <Portfolio worker={worker}/>
        <Reviews worker={worker}/>
      </ScrollView>  
    }
    </View>
  );
}
