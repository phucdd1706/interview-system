// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import { MenuProps } from 'types/menu';

const initialState: MenuProps = {
  openItem: ['dashboard'],
  drawerOpen: false
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    }
  }
});

export default menu.reducer;

export const { activeItem, openDrawer } = menu.actions;
