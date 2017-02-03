import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import TodoList from '../components/TodoList';
import { getVisibleTodos } from '../reducers/index';

class VisibleTodoList extends Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        { ...rest }
        onTodoClick={ toggleTodo }
      />
    );
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id))
//   }
// });

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
  //mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList;
