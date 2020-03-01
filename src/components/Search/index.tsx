import React from 'react';
import { Input, Checkbox } from 'antd';
import styled from '@emotion/styled'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const Root = styled.div`
margin:  -10px 0 ;
& > * {
    margin: 10px 0 ;
};
padding-bottom: 40px;
`
interface IProps {
    value: string
    onChange: (s: string) => void
}


interface IState {
    lifeSearching: boolean
}



export default class Search extends React.Component<IProps, IState> {

    state = {
        lifeSearching: false
    }

    handleChangeLifeSearching = ({ target: { checked: lifeSearching } }: CheckboxChangeEvent) =>
        this.setState({ lifeSearching })

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e.target.value)

    render() {
        const { value, onChange } = this.props
        const { lifeSearching } = this.state

        return <Root>
            {lifeSearching
                ? <Input
                    placeholder="input search text"
                    value={value}
                    onChange={this.handleChange}
                />
                : <Input.Search
                    enterButton="Search"
                    placeholder="input search text"
                    onSearch={onChange}
                />
            }
            <Checkbox onChange={this.handleChangeLifeSearching}>Life searching mode</Checkbox>
        </Root >
    }
};

