import React from 'react';

class Inp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:''
        }
    }

    change = (event) => {
        this.setState({value:event.target.value})

    }


    render() {return (
        <>
        <input onChange={this.change}></input>
        <Input value = {this.state.value}/>
        </>
    )}


}

function Input(props) {
    return <input value={props.value}></input>;
  }


export default Inp