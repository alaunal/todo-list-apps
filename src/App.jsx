import React, { Component } from 'react';
import tw, { styled, css } from 'twin.macro';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isEmpty, map, isEqual, filter } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import Forms from './components/Forms';
import DetailTask from './components/DetailTask';

import kvEmpty from './assets/kv-empy.svg';

const keyStorage = 'dataTask';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTasks: [],
      priorities: ['Low', 'Medium', 'High'],
      popupForm: false,
      popupDetail: false,
      isEdit: false,
      taskEdit: {},
      taskDetail: {},
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handlePopupForm = this.handlePopupForm.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handlePopupDetail = this.handlePopupDetail.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
  }

  componentDidMount() {
    const dataStorage = localStorage.getItem(keyStorage);

    if (isEmpty(dataStorage)) {
      localStorage.setItem(keyStorage, JSON.stringify(this.state.dataTasks));
    } else {
      this.setState({
        dataTasks: JSON.parse(dataStorage),
      });
    }
  }

  componentDidUpdate() {
    const dataStorage = JSON.parse(localStorage.getItem(keyStorage));

    if (!isEqual(dataStorage, this.state.dataTasks)) {
      localStorage.setItem(keyStorage, JSON.stringify(this.state.dataTasks));
    }
  }

  handleReorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const dataTasks = this.handleReorder(
      this.state.dataTasks,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      dataTasks,
    });
  }

  handlePopupForm(isEdit = false, data = {}) {
    this.setState({
      popupForm: !this.state.popupForm,
      isEdit: isEdit,
      taskEdit: isEmpty(data) ? {} : data,
    });
  }

  handlePopupDetail(data = {}) {
    this.setState({
      popupDetail: !this.state.popupDetail,
      taskDetail: isEmpty(data) ? {} : data,
    });
  }

  handleAddTask(data) {
    let rawTask = { ...data, id: uuidv4(), isComplete: false };
    let { dataTasks } = this.state;

    dataTasks.unshift(rawTask);

    this.setState({
      dataTasks: dataTasks,
    });
  }

  handleEditTask(id, data) {
    const { dataTasks } = this.state;
    let restdata = [];

    map(dataTasks, (item) => {
      if (id === item.id) {
        restdata.push({ ...data, id: item.id, isComplete: item.isComplete });
      } else {
        restdata.push(item);
      }
    });

    this.setState({
      dataTasks: restdata,
    });
  }

  handleTaskComplete(id) {
    const { dataTasks } = this.state;
    let restdata = [];

    map(dataTasks, (item) => {
      if (id === item.id) {
        restdata.push({ ...item, isComplete: true });
      } else {
        restdata.push(item);
      }
    });

    this.setState(
      {
        dataTasks: restdata,
      },
      () => {
        toast.info('Task Is complete', {
          position: 'top-center',
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    );
  }

  render() {
    const { dataTasks, priorities, popupForm, isEdit, taskEdit, popupDetail, taskDetail } =
      this.state;

    const taskTodo = filter(dataTasks, ['isComplete', false]);

    return (
      <>
        <Layout>
          <Header onHandlePopupForm={this.handlePopupForm} />

          {isEmpty(taskTodo) ? (
            <Wrapper tw="justify-center items-center">
              <img src={kvEmpty} alt="kv-empty" tw="w-4/5" />
            </Wrapper>
          ) : (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Wrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {map(taskTodo, (item, idx) => (
                      <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided, snapshot) => (
                          <Tasks
                            data={item}
                            domRef={provided.innerRef}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            onHandlePopupDetail={this.handlePopupDetail}
                            onHandleEditTask={this.handlePopupForm}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Wrapper>
                )}
              </Droppable>
            </DragDropContext>
          )}

          <Footer />

          <Forms
            onHandlePopupForm={this.handlePopupForm}
            onHandleAddTask={this.handleAddTask}
            onHandleEditTask={this.handleEditTask}
            isOpen={popupForm}
            priorities={priorities}
            isEdit={isEdit}
            taskEdit={taskEdit}
          />

          <DetailTask
            isOpen={popupDetail}
            dataTask={taskDetail}
            onHandlePopupDetail={this.handlePopupDetail}
            onHandleTaskComplete={this.handleTaskComplete}
          />
        </Layout>

        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

// -- Styled area

const Wrapper = styled.div(({ isEmpty = false, isDraggingOver }) => [
  tw`rounded-3xl w-full shadow-lg overflow-y-auto overflow-x-hidden py-6 px-4 flex flex-col`,
  isDraggingOver ? tw`bg-gray-50` : tw`bg-white`,
  isEmpty && tw`items-center justify-center`,
  css`
    height: calc(100vh - 6rem - 5rem);
  `,
]);

export default App;
