/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'
import Textarea from '../Textarea'
import { TData } from '../../stores/DataStore';
const Root = styled.div`
display: flex;
flex-direction: column;
`

const Row = styled.div`
display: flex;
padding-bottom:8px;
`


interface IProps {
    user: TData | null
}

export default class StyledUser extends React.Component<IProps> {

    render() {
        if (this.props.user === null) return null
        const { user: { lastName, firstName, description, address } } = this.props
        const { streetAddress, city, state, zip } = address

        return <Root>
            <Row>Выбран пользователь:&nbsp;<b>{`${firstName} ${lastName}`}</b></Row>
            <Row css={descriptionStyle}>
                Описание:<Textarea value={description} readOnly /></Row>
            <Row>Адрес проживания:&nbsp; <b>{streetAddress}</b></Row>
            <Row>Город:&nbsp; <b>{city}</b></Row>
            <Row>Провинция/штат:&nbsp; <b>{state}</b></Row>
            <Row>Индекс:&nbsp; <b>{zip}</b></Row>
        </Root>
    }
};

const descriptionStyle = css`
flex-direction: column
`;