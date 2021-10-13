import React from 'react';
import dayjs from 'dayjs';
import tw, { styled } from 'twin.macro';
import { BsChevronRight } from 'react-icons/bs';

function Tasks(props) {
  const { provided, domRef, data, priorities } = props;
  const doDate = dayjs(data.doDate).format('DD MMMM YYYY');
  return (
    <Wrapper
      ref={domRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      tw="flex w-full rounded-2xl bg-white border border-gray-200 px-4 py-5 mb-5"
    >
      <div tw="flex flex-wrap items-center w-full">
        <div tw="flex-1 pr-3">
          <p tw="text-gray-600 md:text-lg line-clamp-2 mb-2 font-medium">{data.title}</p>
          <div tw="flex items-center">
            <div tw="pr-2"><Badget priority={data.priority}>{priorities[data.priority]}</Badget></div>
            <div tw="text-sm md:text-base text-gray-500">{doDate}</div>
          </div>
        </div>
        <div>
          <button tw="inline-flex h-10 w-10 items-center justify-center text-xl text-gray-500" type="button">
              <BsChevronRight />
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

// -- Styled area

const Wrapper = styled.div(() => [
  tw`flex w-full rounded-2xl bg-white border border-gray-200 px-4 py-5 mb-5`,
]);

const Badget = styled.span(({ priority = '' }) => [
  tw`inline-block w-full rounded-full text-xs px-3 py-1`,
  (priority === 0) && tw`bg-yellow-600 text-white`,
  (priority === 1) && tw`bg-blue-600 text-white`,
  (priority === 2) && tw`bg-red-600 text-white`,
]);

export default Tasks;
