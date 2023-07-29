import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

export const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:5000/products/listProduct");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, []
    );

    const Loading = () => {
        return (
            <>
            Loading...
            {/* <div className='col-md-3'>
                <Skeleton height={350}/>
            </div>
            <div className='col-md-3'>
            <Skeleton height={350}/>
            </div>
            <div className='col-md-3'>
                <Skeleton height={350}/>
            </div>
            <div className='col-md-3'>
               <Skeleton height={350}/>
            </div> */}
            </>
        );
    }

    const filterProduct = (cat) => {
        const updatedData=data.filter((x) => x.categoryId === cat);
        setFilter(updatedData);         
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(2)}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(3)}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(4)}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(1)}>Electronics</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.imageUrl} className="card-img-top" alt={product.name} height='250px'/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.name}</h5>
                                            <p className="card-text lead fw-bolder">₹{product.price}</p>
                                            <NavLink to={"/product/"+product.id} className="btn btn-outline-dark">Buy Now</NavLink>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        );
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1> 
                        <hr/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}
