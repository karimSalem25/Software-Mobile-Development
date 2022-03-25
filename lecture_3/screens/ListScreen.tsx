import React, { useState } from "react";
import { useEffect } from "react";
import * as axios from 'axios';
import { Button, Dimensions, View, FlatList, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Item = ({ name, addressFmt, slug, image }) => (
    <View>
        <Card containerStyle={{ justifyContent: "center" }}>
       
            <Carousel
              data={image}
              renderItem={slideshow}
              sliderWidth={327}
              itemWidth={300}
            />
            <Card.Divider />
            <Card.Title>{name}</Card.Title>
            <Card.Divider />
            <Text>Address: {addressFmt}</Text>
        </Card>
    </View>
);

const slideshow = ({item, index}) => {
    
    return (

        <View style={{
            borderRadius: 5,
            height: 300,
            width: 300,
            justifyContent: 'center',
        }}>
            <Image
                style={{ resizeMode: "contain", height: 300,
                width: 300}}
                source={item ? { uri: item } : require('../assets/notFound.png')}
            
                
                
            />
        </View>
    );
}

const ListScreen = () => {
    const route = useRoute<RouteProps>();
    const { term } = route.params;

    const [universities, setUniversity] = useState<University[]>();

    useEffect(() => {
        Promise.all([
            axios.default.get(`http://192.168.56.1:3000/universities/${term}`),
        ])
            .then(([{ data: universitiesResults }]) => {
                if (universitiesResults) setUniversity(universitiesResults);
            });
    }, []);

    const renderItem = ({ item }) => (
        <Item name={item.name} addressFmt={item.addressFmt} slug={item.slug} image={item.image} />
    );


    return (
        <SafeAreaView>
            <View>
                <FlatList
                    data={universities}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

type RouteParams = {
    term: string;
};

type RouteProps = {
    params: RouteParams
    name: string;
    key: string;
};

type University = {
    name: string;
    addressFmt: string;
    slug: string;
    image: Array<string>;
}

export default ListScreen

