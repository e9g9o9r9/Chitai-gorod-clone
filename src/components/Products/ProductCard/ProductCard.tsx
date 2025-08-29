import React from 'react'
import styles from "./styles.module.scss"
import defaultImage from "../../../assets/png/default-image.webp"
import bookmark from "../../../assets/svg/bookmark-product.svg"
import { ProductType } from '../../../types/productTypes'

interface ProductCardProps {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img src={!product.image ? defaultImage : product.image} className={styles.image} />
                <span style={{ color: "#ff5983" }}>{product.price} ₽</span>
                <span className={styles.name}>{product.name}</span>
                <span className={styles.author}>{product.author}</span>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.buyButton}>Купить</button>
                <button className={styles.addBookmarkButton}><img className={styles.addBookmarkIcon} src={bookmark} alt="" /></button>
            </div>
        </div>
    )
}

export default ProductCard