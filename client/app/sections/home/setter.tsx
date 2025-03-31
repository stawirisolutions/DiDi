'use client'

import useMainStore from '@/app/store/main-store'
import { CATEGORY, PRODUCT, SERVICE } from '@/app/utils/types'
import React, { useEffect } from 'react'

interface SETTER_PROPS {
    categories: CATEGORY[],
    products: PRODUCT[],
    services: SERVICE[]
}

const Setter = ({ categories, products, services }: SETTER_PROPS) => {

    const { setCategories, setTopProducts, setTopServices } = useMainStore();

    useEffect(() => {
        setCategories(categories)
        setTopProducts(products)
        setTopServices(services)
    }, [])

  return (
    <></>
  )
}

export default Setter