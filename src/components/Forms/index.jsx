import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import tw, { styled, css } from 'twin.macro';
import { BsXLg } from 'react-icons/bs';
import { map, isEmpty } from 'lodash';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Froms(props) {
  const {
    onHandlePopupForm,
    isOpen,
    isEdit,
    taskEdit,
    priorities,
    onHandleAddTask,
    onHandleEditTask,
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const quillModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  useEffect(() => {
    register('description', {});
  }, [register]);

  useEffect(() => {
    if (!isEmpty(taskEdit)) {
      setValue('title', taskEdit.title, { shouldValidate: false });
      setValue('priority', taskEdit.priority, { shouldValidate: false });
      setValue('dueDate', new Date(taskEdit.dueDate), { shouldValidate: false });
      setValue('description', taskEdit.description, { shouldValidate: false });
    }

    // eslint-disable-next-line
  }, [taskEdit]);

  useEffect(() => {
    if (!isEdit) {
      setValue('title', '', { shouldValidate: false });
      setValue('priority', 'Low', { shouldValidate: false });
      setValue('dueDate', new Date(), { shouldValidate: false });
      setValue('description', '', { shouldValidate: false });
    }

    // eslint-disable-next-line
  }, []);

  const editorContent = watch("description");

  const onEditorDescription = (editorState) => {
    setValue('description', editorState, { shouldValidate: false });
  };

  const onSubmit = (data) => {
    if (isEdit) {
      onHandleEditTask(taskEdit.id, data);
    } else {
      onHandleAddTask(data);
    }

    setTimeout(() => {
      handleClosePopup();
    }, 250);
  };

  const handleClosePopup = () => {
    setValue('title', '', { shouldValidate: false });
    setValue('priority', 'Low', { shouldValidate: false });
    setValue('dueDate', new Date(), { shouldValidate: false });
    setValue('description', '', { shouldValidate: false });
    clearErrors(['title', 'priority', 'dueDate']);

    onHandlePopupForm();
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Content isOpen={isOpen}>
        <div tw="flex justify-between items-center mb-8">
          <div tw="pl-3 border-l-4 border-purple-500">
            <p tw="text-xl md:text-2xl font-medium text-gray-600">
              {isEdit ? 'Edit Task' : 'Create Task'}
            </p>
          </div>
          <div tw="">
            <button tw="px-2 py-1 text-gray-500" onClick={() => handleClosePopup()}>
              <BsXLg />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div tw="w-full flex flex-col mb-4">
            <Label>Task Title</Label>
            <Input
              type="text"
              name="title"
              onChange={(e) => {
                setValue('title', e.target.value, { shouldValidate: false });
              }}
              {...register('title', { required: true, maxLength: 250 })}
              placeholder="Enter your task title here..."
              isError={!isEmpty(errors.title)}
            />

            {errors.title && errors.title.type === 'required' && (
              <span tw="inline-block mt-2 text-sm text-red-500">This task title is required</span>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <span tw="inline-block mt-2 text-sm text-red-500">Maximum character is 250</span>
            )}
          </div>
          <div tw="grid gap-4 grid-cols-2 mb-4">
            <div>
              <Label>Priorities</Label>
              <Select
                onChange={(e) => {
                  setValue('priority', e.target.value, { shouldValidate: false });
                }}
                name="priority"
                {...register('priority', { required: true })}
              >
                {map(priorities, (item, idx) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Due date</Label>
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <DatePicker
                    tw="block w-full text-sm md:text-base border-gray-200 text-gray-800 border rounded-md h-10 md:h-11 outline-none px-4 focus:ring-1 focus:ring-purple-300 border-gray-300"
                    selected={field.value}
                    onChange={(date) => {
                      setValue('dueDate', date, { shouldValidate: false });
                    }}
                    placeholderText="Due date..."
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </div>
          </div>
          <div tw="w-full flex flex-col mb-4">
            <Label>Description Task</Label>
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                name="description"
                value={editorContent}
                onChange={onEditorDescription}
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
              {isEdit ? 'Edit Task' : 'Create task'}
            </button>
          </div>
        </form>
      </Content>
    </Wrapper>
  );
}

// -- proptypes

Froms.propTypes = {
  onHandlePopupForm: PropTypes.func,
  onHandleAddTask: PropTypes.func,
  onHandleEditTask: PropTypes.func,
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  taskEdit: PropTypes.object,
  priorities: PropTypes.array,
};

// -- styled area

const Wrapper = styled.div(({ isOpen = false }) => [
  tw`w-full h-screen fixed top-0 bg-gray-800 bg-opacity-50 z-10`,
  css`
    transition: opacity 0.35s;
    max-width: 600px;
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
  `,
]);

export default Froms;
