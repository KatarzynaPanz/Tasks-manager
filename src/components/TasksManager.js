import React from 'react';

class TasksManager extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'http://localhost:3005/data'
        }
       

    state = {
        task: '',
        id: 0,
        time: 0,
        timeS: 0,
        timeM: 0,
        timeH: 0,
        isDone: false,
        isRunning: false,
        isRemoved: false,
        tasks: [],
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log( tasks)
    }

    taskNameChange = e => {
        this.setState({
            task: e.target.value,
        });
    }

    submitHandler = e => {
        e.preventDefault();
        const {task} = this.state;
        this.addNewTask(`${task}`);
    }

    tasksUpdate = (elements, id) => {
        const newTasks = this.state.tasks.filter(element => element.id !== id);
            newTasks.push(elements);
            newTasks.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                else {
                    return -1;
                }
            });

            this.setState({
                tasks: newTasks,
            });

    }

    addNewTask(element) {
        const data = {name: element, time: 0, isRunning: false, isDone: false, isRemoved: false, id: 0 };
        const options = {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {'Content-Type': 'application/json'}
        };
        fetch(this.url, options)
            .then(resp => resp.json())
            .then(res => (data.id = res.id))
            .catch(err => console.error(err))
            .finally( console.log('Dodano nowe zadanie!') );

        this.setState(state => {
            return {
                tasks: [...state.tasks, data],
            }
        });
    }

    incrementTimeStart = (id) => {
        
        this.iden = setInterval(() => {
            let {time} = this.state;
            let {timeS} = this.state;
            let {timeM} = this.state;
            let {timeH} = this.state;
            timeS = timeS + 1;
            if(timeS === 60){
                timeS = 0;
                timeM = timeM +1;
                if(timeM === 60) {
                    timeM = 0;
                    timeH = timeH +1;
                    if(timeH === 24) {
                        timeH = 0;
                    }
                }
            }
            time = timeS + (timeM/60) + (timeH/3600);
            console.log(time);
            this.setState({
                timeS: timeS,
                timeM: timeM,
                timeH: timeH,
                time: time
            })
        }, 1000);
    }

    incrementTimeStop = (id) => {
        clearInterval(this.iden);
        this.iden = null;
    }

    tasksFilter = (id) => {
        const arr = this.state.tasks.filter(el => el.id === id);
        const data = arr[0];
        return data;
    }

    _fetch(id, info) {
        const options = {
            method: 'PUT',
            body: JSON.stringify( info ),
            headers: {'Content-Type': 'application/json'}
            };
        fetch(`${this.url}/${id}`, options)
        .then(resp => console.log(resp))
        .catch(err => console.error(err))
        .finally(console.log('Zakończone!'));
    }

    taskTimeSwitch = (id, e) => {
        e.preventDefault();
        
        if(e.target.innerText === 'start') {
            this.incrementTimeStart(id);     
            let data = this.tasksFilter(id);
            data.isRunning = true;
            this._fetch(id, data);
            this.tasksUpdate(data, id);
        }

        else if (e.target.innerText === 'stop'){
            let {time} = this.state;
            this.incrementTimeStop(id);     
            let data = this.tasksFilter(id);
            data.isRunning = false;
            data.time = time;
            this._fetch(id, data);
            this.tasksUpdate(data, id);
        }
    }

    taskFinish = (id, e) => {
        e.preventDefault();
        let data = this.tasksFilter(id);
        data.isRunning = false;
        data.isDone = true;
        this._fetch(id, data);       
        this.tasksUpdate(data, id);
    }

    removeTask = (id, e) => {
        e.preventDefault();
        let data = this.tasksFilter(id);
        data.isRemoved = true;       
        this._fetch(id, data); 
        this.tasksUpdate(data, id);
    }

    renderTaskStructure() {
        let timeVariable = 0;
        const {tasks} = this.state;
        const {timeS} = this.state;
        const {timeM} = this.state;
        const {timeH} = this.state;
        const timeVar = '00:00:00';
        let buttonText = 'start';
        let buttonStartSwitcher = true;
        let buttonFinishedSwitcher = true;
        let buttonRemovetSwticher = true;
         return tasks.map(task => {
            if(task.isRemoved === false && task.isRunning === false && task.isDone === false && task.time === 0) {
                timeVariable = timeVar;
                buttonStartSwitcher = false;
            }
            else if (task.isRemoved === false && task.isRunning === true && task.isDone === false && task.time === 0) {
                timeVariable = `${timeH}:${timeM}:${timeS}`;
                buttonText = 'stop';
                buttonStartSwitcher = false;
            }
            else if(task.isRemoved === false && task.isRunning === false && task.isDone === false && task.time > 0){
                timeVariable = `${timeH}:${timeM}:${timeS}`;
                buttonText = 'stop';
                buttonFinishedSwitcher = false;
            }
            else if(task.isRemoved === false && task.isRunning === false && task.isDone === true && task.time > 0){
                timeVariable = `${timeH}:${timeM}:${timeS}`;
                buttonText = 'stop';
                buttonRemovetSwticher = false;
            }
                return(
                    <section>
                          <header>{task.name} czas: {timeVariable}</header>  
                        <footer>
                            <button disabled={buttonStartSwitcher} onClick={(e)=>this.taskTimeSwitch(task.id, e)}>{buttonText}</button>
                            <button disabled={buttonFinishedSwitcher} onClick={(e)=>this.taskFinish(task.id, e)}>finish</button>
                            <button disabled={buttonRemovetSwticher} onClick={(e)=>this.removeTask(task.id, e)}>remove</button>
                        </footer>
                    </section>
                );
            
    });
    }

    render() {
        const {task} = this.state;
        return(
            <section>
                <form onSubmit={this.submitHandler}>
                    <input name="task"
                        value={this.state.task}
                        onChange={this.taskNameChange}
                    />
                    <input type="submit"/>
                </form>
                <h1 onClick={ this.onClick }>TasksManager</h1>
                <div>{this.renderTaskStructure()}</div>
            </section>
        )
    }
}

export default TasksManager;