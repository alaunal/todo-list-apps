import React, { Component } from 'react';
import tw, { styled, css } from 'twin.macro';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map } from 'lodash';

import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTasks: [
        {
          id: '1',
          title: 'Gojek revamp product page phase 3 2022',
          description: '',
          doDate: new Date(),
          priority: 2,
          isComplete: false,
        },
        {
          id: '2',
          title: 'Prime studio phase 2 feature user collaboration',
          description: '',
          doDate: new Date(),
          priority: 0,
          isComplete: false,
        },
        {
          id: '3',
          title: 'FAQ redesign app',
          description: '',
          doDate: new Date(),
          priority: 1,
          isComplete: false,
        },
      ],
      priorities: ['Low', 'Medium', 'high'],
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

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

  render() {
    const { dataTasks, priorities } = this.state;

    return (
      <Layout>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Wrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {map(dataTasks, (item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided, snapshot) => (
                      <Tasks
                        data={item}
                        priorities={priorities}
                        domRef={provided.innerRef}
                        provided={provided}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Wrapper>
            )}
          </Droppable>
        </DragDropContext>
        <Footer />
      </Layout>
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
