import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import arrayMove from 'array-move';

import httpClient from '../../util/httpClient';

const initialState = {
  isLoading: false,
  data: [],
};

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async () => {
    const response = await httpClient.get('/chapters');

    return response.data;
  },
);

export const fetchChapter = createAsyncThunk(
  'chapters/fetchOne',
  async (objectID) => {
    const response = await httpClient.get(`/chapters/${objectID}`);

    return response.data;
  },
);

export const addSection = createAsyncThunk(
  'chapters/addSection',
  async ({ title, chapterIndex }, { getState }) => {
    const chapter = getState().chapters.present.data.find((chapter) => (
      chapter._id === chapterIndex
    ));

    const data = {
      completed: false,
      sections: chapter.sections.concat({
        title,
        completed: false,
      }),
    };

    const response = await httpClient.put(`/chapters/${chapterIndex}`, data);

    return response.data;
  },
);

export const sortSections = createAsyncThunk(
  'chapters/sortSections',
  async ({ oldIndex, newIndex, collection: chapterIndex }, { getState }) => {
    const chapter = getState().chapters.present.data.find((chapter) => (
      chapter._id === chapterIndex
    ));

    const sections = arrayMove(chapter.sections, oldIndex, newIndex);

    const data = {
      completed: chapter.completed,
      sections,
    };

    const response = await httpClient.put(`/chapters/${chapterIndex}`, data);

    return response.data;
  },
);

export const toggleSection = createAsyncThunk(
  'chapters/toggleSection',
  async ({ sectionIndex, chapterIndex }, { getState }) => {
    const chapter = getState().chapters.present.data.find((chapter) => (
      chapter._id === chapterIndex
    ));

    const sections = chapter.sections.map(
      (section, index) => (
        index === sectionIndex
          ? { ...section, completed: !section.completed }
          : section
      )
    );

    const chapterCompleted = sections.every((section) => section.completed === true);

    const data = {
      completed: chapterCompleted,
      sections,
    };

    const response = await httpClient.put(`/chapters/${chapterIndex}`, data);

    return response.data;
  },
);

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    sortChapters(state, { payload }) {
      return {
        ...state,
        data: arrayMove(
          state.data,
          payload.oldIndex,
          payload.newIndex,
        ),
      };
    },
    addChapter(state, { payload }) {
      return {
        ...state,
        data: state.data.concat({
          title: payload.title,
          completed: false,
          sections: [],
        }),
      };
    },
    replaceSection(state, { payload }) {
      let section;
      let chapters = state.data.map(
        (chapter, index) => {
          if (index === payload.chapterIndex) {
            let sections = chapter.sections;
            section = sections[payload.sectionIndex];
            sections = sections.filter((_, index) => index !== payload.sectionIndex);

            return { ...chapter, sections };
          } else {
            return chapter;
          }
        }
      );

      return {
        ...state,
        data: chapters.map(
          (chapter, index) => {
            if (index === payload.newChapterIndex) {
              return {
                ...chapter,
                sections: chapter.sections.concat({
                  title: section.title,
                  completed: section.completed,
                })
              };
            } else {
              return chapter;
            }
          }
        ),
      };
    },
  },
  extraReducers: {
    [fetchChapters.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchChapters.fulfilled]: (_, action) => ({
      ...initialState,
      data: action.payload,
    }),
    [fetchChapter.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchChapter.fulfilled]: (_, action) => ({
      ...initialState,
      data: [action.payload],
    }),
    [addSection.fulfilled]: (state, action) => {
      const indexForUpdate = state.data.findIndex((chapter) => (
        chapter._id === action.payload._id
      ));

      state.data[indexForUpdate] = action.payload;
    },
    [toggleSection.fulfilled]: (state, action) => {
      const indexForUpdate = state.data.findIndex((chapter) => (
        chapter._id === action.payload._id
      ));

      state.data[indexForUpdate] = action.payload;
    },
    [sortSections.fulfilled]: (state, action) => {
      const indexForUpdate = state.data.findIndex((chapter) => (
        chapter._id === action.payload._id
      ));

      state.data[indexForUpdate] = action.payload;
    },
  },
});

export const {
  sortChapters,
  addChapter,
  replaceSection,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;
