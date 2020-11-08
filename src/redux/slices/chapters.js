import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import arrayMove from 'array-move';
import axios from 'axios';

const API_KEY = '5f9ef25d231ba42851b4a03c';

const initialState = {
  isLoading: false,
  data: [],
};

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async () => {
    const response = await axios({
      method: 'GET',
      url: 'https://chapters-ac63.restdb.io/rest/chapters',
      headers: {
        'x-apikey': API_KEY,
      },
    });

    return response.data;
  },
);

export const fetchChapter = createAsyncThunk(
  'chapters/fetchOne',
  async (objectID) => {
    const response = await axios({
      method: 'GET',
      url: `https://chapters-ac63.restdb.io/rest/chapters/${objectID}`,
      headers: {
        'x-apikey': API_KEY,
      },
    });

    return response.data;
  },
);

export const updateChapter = createAsyncThunk(
  'chapters/updateOne',
  async ({ chapterIndex, chapterCompleted, sections }) => {
    const data = {
      completed: chapterCompleted,
      sections,
    };

    const response = await axios({
      method: 'PUT',
      url: `https://chapters-ac63.restdb.io/rest/chapters/${chapterIndex}`,
      data,
      headers: {
        'x-apikey': API_KEY,
      },
    });

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
    [updateChapter.fulfilled]: (state, action) => {
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
  toggleSection,
  addSection,
  sortSections,
  replaceSection,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;
