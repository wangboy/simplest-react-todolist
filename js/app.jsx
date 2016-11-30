/**
 * Created by wangbo on 2016/11/25.
 */
let TodoBox = React.createClass({
  getInitialState: function () {
    return {
      data: [
        {id: 1, task: "eat", state: false},
        {id: 2, task: "sleep", state: false},
        {id: 3, task: "work", state: true}
      ]
    }
  },

  handleFinish: function (taskId) {
    let data = this.state.data
    data.forEach(function (item) {
      if (item.id == taskId) {
        item.state = !item.state
      }
    })
    this.setState({data})
  }
  ,
  handleDelete: function (taskId) {
    let data = this.state.data
    data = data.filter(function (item) {
      return item.id != taskId
    })
    this.setState({data})
  },
  handleSubmit: function (task) {
    let data = this.state.data
    data.push({
      id: this.genId(),
      task: task,
      state: false
    })
    this.setState({data})
  },
  genId: function () {
    return Math.floor(Math.random() * 90000) + 1000
  },
  render: function () {
    var items = this.state.data.map(function (item) {
      return (
        <TodoItem
          task={item}
          delete={this.handleDelete}
          finish={this.handleFinish}
        />

      )
    }, this)
    // <li>{item.task}</li>
    console.log(" todo items " + items)
    return (
      <div className="well">
        {items}
        <TodoForm
          submitTask={this.handleSubmit}
        ></TodoForm>
      </div>
    )
  }
})

let TodoItem = React.createClass({
  toggleComplete: function (e) {
    this.props.finish(this.props.task.id)
  },
  deleteTask: function (e) {
    this.props.delete(this.props.task.id)
  },
  mouseOver: function (e) {
    this._deleteBtn.style.display = "inline"
  },
  mouseOut: function (e) {
    this._deleteBtn.style.display = "none"
  },
  render: function () {
    let task = this.props.task.task
    let checked = this.props.task.state
    let clz = "list-group-item"
    if (checked === true) {
      clz = "list-group-item-success"
      task = <s>{this.props.task.task}</s>
    }

    console.log(" render task " + this.props.task.task)
    return (
      <li className={clz}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}>

        <input type="checkbox"
               checked={checked}
               onChange={this.toggleComplete}
               className="pull-left"/>
        {task}
        <div className="pull-right">
          <button type="button"
                  className="btn btn-xs close"
                  onClick={this.deleteTask}
                  ref={it => this._deleteBtn = it}>Delete
          </button>
        </div>

      </li>
    )
  }
})

var TodoForm = React.createClass({
  submit: function (e) {
    console.log(" commit task " + this._task.value)
    e.preventDefault()
    let task = this._task.value.trim()
    if (!task) {
      return;
    }
    console.log(" add task " + task)
    this.props.submitTask(task)
    this._task.value = ""
  },
  render: function () {
    return (
      <div>
        <hr/>
        <form className="form-horizontal" onSubmit={this.submit}>
          <div className="form-group">
            <label for="task" className="col-md2 control-label">Task</label>
            <div className="col-md-10">
              <input type="text" id="task" ref={it => this._task = it} className="form-control"
                     placeholder="what do you want to do "></input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-right">
              <input type="submit" value="Save Task" className="btn btn-primary"/>
            </div>
          </div>
        </form>
      </div>
    )
  },
})

ReactDOM.render(
  <TodoBox />,
  document.getElementById("todoBox")
);