import React from 'react'
import {Container, Content} from 'native-base'
import {RowComponent} from './RowComponent';

export  const ListComponent =({lista,onDelete})=>(
    <Container>
        <Content>
            {lista.map(
                (item,i) => <RowComponent
                    key={i}
                    item={item}
                    id={i}
                    onDelete={onDelete}
                />
            )}
        </Content>
    </Container>
);