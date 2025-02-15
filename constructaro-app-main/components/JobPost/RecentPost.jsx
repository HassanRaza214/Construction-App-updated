import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";
import JobPostingCard from './JobPostingCard';
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";

export default function RecentProposals() {
    const [proposalList, setProposalList] = useState([]);
  
    // useEffect hook to fetch Proposal list when the component mounts
    useEffect(() => {
      GetProposalList();
    }, []);
  
    // Function to fetch Proposal data from Firebase Firestore
    const GetProposalList = async () => {
      setProposalList([]); // Clear previous Proposal data
  
      // Firebase query to get documents from the 'Proposal' collection
      const q = query(collection(db, "Proposals"));
      const querySnapshot = await getDocs(q); // Await response
  
      // Iterating over each document in the query snapshot
      querySnapshot.forEach((doc) => {
        console.log(doc.data()); // Log document data (for debugging)
  
        // Update ProposalList state with new Proposal data
        setProposalList((prev) => [...prev, doc.data()]);
      });
    };
  return (
    <View>
        <FlatList
                  data={proposalList} // Data source for the FlatList
                  
                  // Render each item using ProposalItem component
                  renderItem={({ item, index }) => (
                    <JobPostingCard
                      proposal={item} // Pass Proposal data as prop
                      key={index} // Unique key for each item
                    />
                  )}
                />
    </View>
  )
}