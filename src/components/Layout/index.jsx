import React from 'react';
import PropTypes from "prop-types";
import tw, { styled, css } from 'twin.macro';

const Layout = (prop) => {
  return (
    <Wrapper>
      {prop.children}
    </Wrapper>
  )
};

// -- proptypes

Layout.propTypes = {
  children: PropTypes.node
};

// -- Styled area

const Wrapper = styled.main(() => [
  tw`mx-auto w-full bg-purple-500 min-h-screen relative`,
  css`
    max-width: 600px;
  `
]);

export default Layout;
