import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
  } from '@reduxjs/toolkit';
  import api from '../api/hero';
  
  const heroesAdapter = createEntityAdapter({
    selectId: heroes => heroes.heroId
  });

  export const heroSelectors = heroesAdapter.getSelectors();

  
  const initialState = {
    heroes: heroesAdapter.getInitialState(),
    getHeroStatus: {
        error: null,
        pending: false
    },
    getHeroesStatus: {
        error: null,
        pending: false
    }
  };
  
  export const getHero = createAsyncThunk(
    'heroes/getHero',
    async (heroId, thunkApi) => {
      try {
        const response = await api.getHero(heroId);
  
        return response;
      } catch (err) {
        throw thunkApi.rejectWithValue(err);
      }
    }
  );
  
  export const getHeroes = createAsyncThunk(
    'heroes/getHeroes',
    async (params, thunkApi) => {
      try {
        const response = await api.getHeroes(params);
  
        return response;
      } catch (err) {
        throw thunkApi.rejectWithValue(err);
      }
    }
  );
  
  
  const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {},
    extraReducers: {
      [getHeroes.pending]: state => {
        state.getHeroesStatus = {
            error: null,
            pending: true
        };
      },
      [getHeroes.fulfilled]: (state, action) => {
        heroesAdapter.upsertMany(state.heroes, action.payload.heroes);
        state.getHeroesStatus = {
            error: null,
            pending: false
        };
      },
      [getHeroes.rejected]: (state, action) => {
        state.getHeroesStatus = {
            error: action.error,
            pending: false
        };
      },
      [getHero.pending]: state => {
        state.getHeroStatus = {
            error: null,
            pending: true
        };
      },
      [getHero.fulfilled]: (state, action) => {
        heroesAdapter.upsertOne(state.heroes, action.payload);
        state.getHeroStatus = {
            error: null,
            pending: false
        };
      },
      [getHero.rejected]: (state, action) => {
        state.getHeroStatus = {
            error: action.error,
            pending: false
        };
        state.error = action.error;
      }
    }
  });

  export const {
    selectById: selectHeroesById,
    selectAll: selectAllHeroes
  } = heroesAdapter.getSelectors(state => state.heroes.heroes)
  
  export default heroesSlice.reducer;