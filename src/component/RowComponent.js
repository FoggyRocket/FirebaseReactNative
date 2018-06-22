import React from 'react'
import { Button, ListItem, Text, IconLeft,Body,Right,View,Left,Icon} from 'native-base'


export const RowComponent = ({item,onDelete,id})=>(
    <View>
        <ListItem icon>
            <Left>
                <Icon name="beer"/>
            </Left>
            <Body>
             <Text>{item.name} </Text>
            </Body>
            <Right>
                <Button transparent onPress={()=>onDelete(id)}>
                    <Icon name="flame"/>
                </Button>
            </Right>
        </ListItem>
    </View>
);