import React from 'react';

const Card = ({ country }) => {
    console.log(country)
    const numberWithComath = (pop) =>{
        return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return (
        <li className="card">
            <img src = {country.flag} alt = "flag"/>
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li>pop: {numberWithComath(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;