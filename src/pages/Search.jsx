import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link, useParams } from 'react-router-dom';
import { searchProductsApi } from '../api/Api';

const Search = () => {

    // get the query from previous page
  const {query} = useParams();

//   set the query to state
  const [searchQuery, setSearchQuery] = useState(query)

//   for storing the products from api
  const [products, setProducts] = useState([])

  // load the products when page loads
  useEffect(() => {
    searchProductsApi(searchQuery).then(res => {
        setProducts(res.data.products)
    }).catch(err => {
        console.log(err)
    })
  }, [])

  console.log(products)

  const handleSearch = (e) => {
    e.preventDefault()
    searchProductsApi(searchQuery).then(res => {
        setProducts(res.data.products)
    }).catch(err => {
        console.log(err)
    })
  }


  return (
    <div className='container mt-3'>

        <div className="d-flex justify-content-between">
            <h3>Search products</h3>

            <form action="">
              <input type="text" className='form-control' placeholder='Search products' onChange={(e)=> setSearchQuery(e.target.value)} />
              <button type='submit' hidden onClick={handleSearch}>Submit</button>
          </form>

        </div>

        <p>
            Results for : {searchQuery}
        </p>

        <div className='row row-cols-1 row-cols-md-4 g-4'>
            {
                products.length > 0 ? (

                    products.map((product) => (
                        <Link to={`/product/details/${product._id}`}>
                            <Card product={product}/>
                        </Link>
                    ))

                ) : (
                    <div className='col'>
                        <h3>No products found</h3>
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Search