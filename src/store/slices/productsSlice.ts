import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../../services/productService';

interface Product {
    id: string,
    name: string,
    image?: string,
    price: string,
    author: string,
    description: string,
}

interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentProduct: Product | null;
}

const initialState: ProductsState = {
    products: [],
    status: "idle",
    error: null,
    currentProduct: null
}

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProducts();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
            state.currentProduct = action.payload;
        },
        clearProducts: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
    },
});

export default productsSlice.reducer