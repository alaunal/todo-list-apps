import React, { useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { BsXLg } from 'react-icons/bs';
import { map } from 'lodash';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Froms({ onHandlePopupForm, isOpen, priorities }) {
  const initData = {
    title: '',
    priority: 0,
    dueDate: null,
    description: '',
  };

  const [formData, setFormdata] = useState(initData);

  const quillModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Content isOpen={isOpen}>
        <div tw="flex justify-between items-center mb-8">
          <div tw="pl-3 border-l-4 border-purple-500">
            <p tw="text-xl md:text-2xl font-medium text-gray-600">Create Task</p>
          </div>
          <div tw="">
            <button tw="px-2 py-1 text-gray-500" onClick={() => onHandlePopupForm()}>
              <BsXLg />
            </button>
          </div>
        </div>

        <form>
          <div tw="w-full flex flex-col mb-4">
            <Label>Task Title</Label>
            <Input type="text" placeholder="Enter your task title here..." />
          </div>
          <div tw="grid gap-4 grid-cols-2 mb-4">
            <div>
              <Label>Priorities</Label>
              <Select>
                {map(priorities, (item, idx) => (
                  <option value={idx} key={idx}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Due date</Label>
              <Input type="date" placeholder="Due date" />
            </div>
          </div>
          <div tw="w-full flex flex-col mb-4">
            <Label>Description Task</Label>
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(e) => setFormdata({ ...formData, description: e })}
                modules={quillModule}
                tw="w-full block"
              />
            </QuillWrapper>
          </div>

          <div tw="flex w-full justify-center pt-10">
            <button
              tw="inline-flex bg-purple-600 hover:bg-purple-800 rounded-full py-2 px-5 md:py-3 md:px-8 text-white text-sm md:text-base items-center font-medium"
              type="submit"
            >
              Create task
            </button>
          </div>
        </form>
      </Content>
    </Wrapper>
  );
}

// -- styled area

const Wrapper = styled.div(({ isOpen = false }) => [
  tw`w-full h-screen absolute top-0 left-0 bg-gray-800 bg-opacity-50 z-10`,
  css`
    transition: opacity 0.35s;
  `,
  isOpen ? tw`opacity-100 pointer-events-auto` : tw`opacity-0 pointer-events-none`,
]);

const Content = styled.div(({ isOpen = false }) => [
  tw`w-full flex flex-col absolute left-0 bg-white rounded-b-3xl z-20 px-5 md:px-8 pt-6 pb-10`,
  css`
    transition: top 0.6s;
  `,
  isOpen
    ? tw`top-0`
    : css`
        top: -100vh;
      `,
]);

const Input = styled.input(({ isError = false }) => [
  tw`block w-full text-sm md:text-base border-gray-200 text-gray-800 border rounded-md h-10 md:h-11 outline-none px-4 focus:ring-1`,
  isError ? tw`focus:ring-red-500 border-red-300` : tw`focus:ring-purple-300 border-gray-300`,
  css`
    &::placeholder {
      ${tw`text-gray-400`}
    }
  `,
]);

const Select = styled.select(({ isError = false }) => [
  tw`block w-full text-sm md:text-base border-gray-200 text-gray-800 border rounded-md h-10 md:h-11 outline-none px-4 focus:ring-1`,
  isError ? tw`focus:ring-red-500 border-red-300` : tw`focus:ring-purple-300 border-gray-300`,
  css`
    &::placeholder {
      ${tw`text-gray-400`}
    }
  `,
]);

const Label = styled.label(() => [
  tw`inline-block mb-2 text-xs md:text-sm text-gray-600 font-medium`,
]);

const QuillWrapper = styled.label(() => [
  css`
    .ql-editor {
      ${tw`h-28 md:h-32`}
    }
  `
]);

export default Froms;
