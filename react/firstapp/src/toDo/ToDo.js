import React from 'react';
import './ToDo.css'


class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ['Первая тестовая тудушечка', 'Вторая тестовая тудушечка'],
            inputValue:'',
            selectedId:null,

        }
        this.inputValue = React.createRef();
    }

    add = () => {
        this.setState((prevState) => {
            return { todos: [...prevState.todos, this.state.inputValue] }
        })
    }

    delete = (index) => {
        let to = this.state.todos.filter((_, i) => i !== index)
        this.setState({ todos: to });
    }

    change = (index, text) => {
        this.setState({inputValue:text, selectedId:index})
    }

    save = () => {
        let to = this.state.todos.map((elem,i) => {
           return i === this.state.selectedId ? this.state.inputValue : elem
        });
        this.setState({ todos: to, selectedId:null,inputValue:'' });

    }

    changeValue = (event) => {
        this.setState({inputValue:event.target.value})
    }

    render() {
        return (
            <div>
                <Input onChange={this.changeValue} inputValue={this.state.inputValue} inputref={this.inputValue} />
                <ButtonAdd onClick={this.add} />
                {this.state.selectedId === null ? null : <button onClick={()=>this.save()}>save</button>}
                {this.state.todos.map((elem, index) => {
                    return <ToDoItem edit={()=>this.change(index, elem)} onClick={() => this.delete(index)} key={index}>{elem}</ToDoItem>
                })}
            </div>)
    }
}

function ToDoItem(props) {
    return <><div className='todoitem'>{props.children}</div>
        <button onClick={props.onClick}>x</button>
        <button onClick={props.edit}>edit</button>
    
        
        </>
}


function Input(props) {
    return <input ref={props.inputref} onChange={props.onChange} value={props.inputValue}></input>
}

function ButtonAdd(props) {
    return <><button onClick={props.onClick}>Добавить Тудушечку</button><br /></>
}


export default ToDo





// import React from 'react';
// import './ToDo.css'


// class ToDo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             todos: ['Первая тестовая тудушечка', 'Вторая тестовая тудушечка'],
//         }
//         this.inputValue = React.createRef();
//     }

//     add = () => {
//         this.setState((prevState) => {
//             return { todos: [...prevState.todos, this.inputValue.current.value] }
//         })
//     }

//     delete = (index) => {
//         let to = this.state.todos.filter((_, i) => i !== index)
//         this.setState({ todos: to });
//     }

//     change = (index, text) => {
//         console.log(this.inputValue.current.value)
//     }

//     render() {
//         return (
//             <div>
//                 <Input inputref={this.inputValue} />
//                 <ButtonAdd onClick={this.add} />
//                 {this.state.todos.map((elem, index) => {
//                     return <ToDoItem edit={()=>this.change(index, elem)} onClick={() => this.delete(index)} key={index}>{elem}</ToDoItem>
//                 })}
//             </div>)
//     }
// }

// function ToDoItem(props) {
//     return <><div className='todoitem'>{props.children}</div>
//         <button onClick={props.onClick}>x</button>
//         <button onClick={props.edit}>edit</button></>
// }


// function Input(props) {
//     return <input ref={props.inputref}></input>
// }

// function ButtonAdd(props) {
//     return <><button onClick={props.onClick}>Добавить Тудушечку</button><br /></>
// }


// export default ToDo