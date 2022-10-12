import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Divider from '@mui/material/Divider'

import { useProducts } from '../../hooks/fectchData'
import { State } from '../../types'
import Product from '../Product/Product'
import './FilteredProducts.css'
import MotionWrapper from '../../Wrapper/MotionWrapper'

const FilteredProducts = () => {
  const [animateCard, setAnimateCard] = useState<any>({
    y: 0,
    opacity: 1,
  })
  const products = useSelector((state: State) => state.products.data)
  const [keyword, setKeyword] = useState('All')
  const filteredProducts = products?.filter((product) =>
    product.tags.includes(keyword)
  )
  useProducts()

  const handleProductsFilter = (item: string) => {
    setKeyword(item)
    setAnimateCard([{ y: 100, opacity: 0 }])
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }])
    }, 500)
  }

  return (
    <div>
      <div className="products-filter">
        {['All', 'Conditioner', 'Oil', 'Treatment', 'Shampoo', 'Butter'].map(
          (item, index) => (
            <div
              onClick={() => {
                handleProductsFilter(item)
              }}
              key={index}
              className={`filter-item ${keyword === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          )
        )}
      </div>
      <Divider
        style={{ width: '90%', background: '#46364a', margin: '0 auto' }}
      />
      <motion.div
        className="products-container"
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '0px auto 100px auto',
          width: '80%',
        }}
      >
        {filteredProducts.map((product) => {
          return <Product key={product._id} product={product} />
        })}
      </motion.div>
    </div>
  )
}

export default MotionWrapper(FilteredProducts)
