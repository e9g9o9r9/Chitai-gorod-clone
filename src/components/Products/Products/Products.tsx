import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { fetchProducts } from '../../../store/slices/productsSlice'
import ProductCard from '../ProductCard/ProductCard'

const wrapper = {
    display: "flex"
}

const Products: React.FC = () => {
    const products = useAppSelector((state) => state.products.products)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <Box sx={wrapper}>
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />
            })}
        </Box>
    )
}

export default Products