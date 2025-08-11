import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from '../../services/categoryService';

interface Category {
    id: string,
    name: string,
    icon: string
}

interface CategoriesState {
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentCategory: Category | null;
}

const initialState: CategoriesState = {
    categories: [],
    status: "idle",
    error: null,
    currentCategory: null
}

export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCategories();            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        },
        clearCategories: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
            })
    },
});

export default categoriesSlice.reducer