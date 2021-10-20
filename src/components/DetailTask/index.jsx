import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import tw, { styled, css } from 'twin.macro';
import { BsXLg } from 'react-icons/bs';

function DetailTask(props) {
  const { onHandlePopupDetail, onHandleTaskComplete, dataTask, isOpen } = props;
  const doDate = dayjs(dataTask.doDate).format('DD MMMM YYYY');

  const [ status, setStatus ] = useState(dataTask.isComplete);

  const handleComplete = (id) => {
    setStatus(!status);

    setTimeout(() => {
      onHandleTaskComplete(id);
      onHandlePopupDetail();
    }, 350);
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Content isOpen={isOpen}>
        <div tw="flex justify-between items-center mb-8">
          <div tw="pl-3 border-l-4 border-purple-500">
            <p tw="text-xl md:text-2xl font-medium text-gray-600">Detail Task</p>
          </div>
          <div tw="">
            <button tw="px-2 py-1 text-gray-500" onClick={() => onHandlePopupDetail()}>
              <BsXLg />
            </button>
          </div>
        </div>

        <h3 tw="text-lg md:text-xl text-gray-700 mb-4">{dataTask.title}</h3>
        <div tw="flex items-center">
          <div tw="pr-2">
            <Badget priority={dataTask.priority}>{dataTask.priority}</Badget>
          </div>
          <div tw="text-sm md:text-base text-gray-500">{doDate}</div>
        </div>
        <Detail>
          <div dangerouslySetInnerHTML={{ __html: dataTask.description }} />
        </Detail>

        <div tw="flex w-full justify-center pt-10">
          <button
            tw="inline-flex bg-green-600 hover:bg-green-800 rounded-full py-2 px-5 md:py-3 md:px-8 text-white text-sm md:text-base items-center font-medium"
            type="button"
            onClick={() => handleComplete(dataTask.id)}
          >
            {status ? 'Task Completed' : 'Mark Complete'}
          </button>
        </div>
      </Content>
    </Wrapper>
  );
}

// -- proptypes

DetailTask.propTypes = {
  onHandlePopupDetail: PropTypes.func,
  onHandleTaskComplete: PropTypes.func,
  dataTask: PropTypes.object,
  isOpen: PropTypes.bool,
};

// -- styled area

const Wrapper = styled.div(({ isOpen = false }) => [
  tw`w-full h-screen fixed top-0 bg-gray-800 bg-opacity-50 z-10 mx-auto`,
  css`
    transition: opacity 0.35s;
    max-width: 600px;
  `,
  isOpen ? tw`opacity-100 pointer-events-auto` : tw`opacity-0 pointer-events-none`,
]);

const Content = styled.div(({ isOpen = false }) => [
  tw`w-full flex flex-col absolute left-0 bg-white rounded-t-3xl z-20 px-5 md:px-8 pt-6 pb-10`,
  css`
    transition: bottom 0.6s;
    max-height: 100vh;
  `,
  isOpen
    ? tw`bottom-0`
    : css`
        bottom: -100vh;
      `,
]);

const Detail = styled.div(() => [
  tw`bg-gray-50 rounded-xl p-4 block mt-6`,
  css`
    p {
      ${tw`font-body text-sm md:text-base text-gray-800 leading-6`}

      b, strong {
        ${tw`font-medium md:font-bold`}
      }

      i,
      em {
        ${tw`italic`}
      }
    }
  `,
]);

const Badget = styled.span(({ priority = '' }) => [
  tw`inline-block w-full rounded-full text-xs px-3 py-1`,
  priority === 'Low' && tw`bg-yellow-600 text-white`,
  priority === 'Medium' && tw`bg-blue-600 text-white`,
  priority === 'High' && tw`bg-red-600 text-white`,
]);

export default DetailTask;
