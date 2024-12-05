import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig'

export default function Reviews({ worker }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();
    // const {user}=useUser();

    const onSubmit = async () => {
        const docRef = doc(db, "WorkersList", worker?.id)
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                // userName:user?.fullName,
                // userImage:user?.imageUrl,
            })
        })

        ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM)
    }

    return (
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>Reviews</Text>
            <View>
                <Rating
                    showRating={false}
                    imageSize={25}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write Your Comment'
                    numberOfLines={4}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: "#666",
                        textAlignVertical: "top"
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 8,
                        marginTop: 10
                    }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 15,
                        fontWeight: "500"
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View>
                {/* <FlatList
                data={worker}
                renderItem={({item,index})=>(
                    <Text>{item.comment}</Text>
                )}
                /> */}
                {worker?.reviews?.map((item, index) => (
                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        gap:10,
                        alignItems:'center',
                        padding:10,
                        borderWidth:1,
                        borderColor:"#666",
                        borderRadius:15,
                        marginTop:10
                    }}>
                        {/* <Image source={{ uri: item.userImage }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99,
                            }}
                        />
                        <View style={{
                            display: 'flex',
                            gap:5
                        }}>
                            <Text style={{}}>{item.userName}</Text> */}
                            <Rating
                                imageSize={15}
                                ratingCount={item.rating}
                                style={{ alignItems: 'flex-start' }}
                            />
                            <Text>{item.comment}</Text>
                        </View>
                    // </View>
                ))}
            </View>
        </View>
    )
}