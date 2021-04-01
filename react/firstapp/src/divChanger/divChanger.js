import React from 'react';

class DivChanger extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            display:true,
        }
    }

    change = () => {
        this.setState( (prevStare) => {
           return { display: !prevStare.display }
        }
            
        )
    }




    render(){ return(
        <>
        <button onClick={this.change}>Yeeee</button>
        {this.state.display ? <FirstDiv/> : <SecDiv/>}
        </>
        )
    }

}



function FirstDiv(props){
    return <div>Первый див типо какойто компонент</div>
}

function SecDiv(props){
    return <div>Второй див типо какойто второй компонент</div>
}

export default DivChanger