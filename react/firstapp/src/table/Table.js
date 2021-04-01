import React from 'react';

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values:
                [
                    { name: '2Кирилл', secondName: 'Терещук3', age: '88' },
                    { name: '1Кирилл', secondName: 'Терещук2', age: '29' },
                    { name: '3Кирилл', secondName: 'Терещук4', age: '24' },
                    { name: '4Кирилл', secondName: 'Терещук1', age: '21' },
                ],
            bckpValues:
            [
                { name: '2Кирилл', secondName: 'Терещук3', age: '88' },
                { name: '1Кирилл', secondName: 'Терещук2', age: '29' },
                { name: '3Кирилл', secondName: 'Терещук4', age: '24' },
                { name: '4Кирилл', secondName: 'Терещук1', age: '21' },
            ],
            tableTemplates:
                { name: '1', secondName: '', age: '' },

            sort:true,


        }

    }

    colSort = (sortRow) => {
        this.setState((prevState)=>{
            return (this.state.sort === true) ? 
            {values: prevState.values.sort((a,b)=>(a[sortRow] > b[sortRow] ? 1 : -1)), sort:false} :
            {values: prevState.values.sort((a,b)=>(a[sortRow] < b[sortRow] ? 1 : -1)), sort:true}

        })

    }

    changeNameHandler = (event) => {
        console.log(event.target.name)
        this.setState((prevState)=>{
            return {tableTemplates: {...prevState.tableTemplates, [event.target.name]: event.target.value}}
        })
    
    }

    add = () => {
        this.setState((prevState)=>{
            return {values:[...prevState.values, this.state.tableTemplates],bckpValues:[...prevState.values, this.state.tableTemplates]}
        })
     
    }

    searchTable = (event) => {
        
        this.setState((prevState)=>{
            return {values:prevState.values.filter(el => el.name === event.target.value)}
        })

    }

    deleteItem = (index) => {
        let to = this.state.todos.filter((_, i) => i !== index)
        this.setState((prevState)=>{
            return { values: to}
        })
    }

    render() {
        return (
            <div>
                <input onChange={this.searchTable}></input>
                {String(this.state.tableTemplates.name)}
                <table className="table table-striped">
                    {Object.keys(this.state.tableTemplates)?.map((key) => {
                        return <th onClick={()=>this.colSort(key)}>{key}</th>
                    })}
                    {this.state.values?.map((element, index) => {

                        return <Tr selector1="modal" selector2="#staticBackdrop" onClick={()=>this.deleteItem(index)}>
                            {
                                Object.entries(element)?.map(
                                    (el) => {

                                        return <Td>{el[1]}</Td>
                                    }
                                )


                            }
                        </Tr>
                    })}
                </table>

                <Modal name={this.changeNameHandler} add={this.add}/>
            </div>
        )
    }
}


function Tr(props) {
    return <tr data-bs-toggle={props.selector1} data-bs-target={props.selector2}>{props.children}</tr>
}

function Td(props) {
    return <td>{props.children}</td>
}


function Modal(props) {
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div clclassNameass="modal-body">
                        <input type="text" class="form-control" onChange={props.name} name='name'></input>
                        <input type="text" class="form-control" onChange={props.name} name='secondName'></input>
                        <input type="text" class="form-control" onChange={props.name} name='age'></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={props.add}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tables