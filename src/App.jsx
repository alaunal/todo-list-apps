import React, { Component } from 'react';
import tw, { styled, css } from 'twin.macro';

import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      tasks: [],
      keyword: "",
      sort: 0,
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Layout>
        <Header />
        <Wrapper>

        </Wrapper>
        <Footer />
      </Layout>
    );
  }
}

// -- Styled area

const Wrapper = styled.main(() => [
  tw`bg-white rounded-2xl w-full shadow-lg overflow-y-auto overflow-x-hidden py-6 px-4`,
  css`
    height: calc(100vh - 6rem - 5rem);
  `
]);

export default App;
