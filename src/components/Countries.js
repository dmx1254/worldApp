import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRadion] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
    useEffect(() =>{
        if(playOnce){

            axios.get("https://restcountries.com/v2/all?fields=name,population,region,capital,flag")
            .then((res) =>{
                setData(res.data)
                setPlayOnce(false)
            }
            );
        }
        const sortedCoutry = () =>{
            const countryObjet = Object.keys(data).map((i) =>data[i]);
            const sortedArray = countryObjet.sort((a, b) =>{
                return b.population - a.population;
            });
            sortedArray.length = rangeValue;
            setSortedData(sortedArray);
        }
        sortedCoutry();
    }, [data, playOnce,rangeValue]);
    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min = "1" max = "250" value = {rangeValue} onChange = {(e) =>setRangeValue(e.target.value)} />
                <ul>
                    {radios.map((radio) =>{
                        return (
                            <li key = {radio}>
                                <input type="radio" value = {radio} id = {radio} 
                                checked = {radio === selectedRadio} onChange = {(e) =>setSelectedRadion(e.target.value)}
                                />
                                <label htmlFor = {radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="cancel">
               {selectedRadio && <h5 onClick = {() =>setSelectedRadion("")}>Annuler recherche</h5>}
            </div>
            <ul className="countries-list">
                {sortedData
                .filter((country) => country.region.includes(selectedRadio))
                .map((country, index) =>(
                    <Card country = {country} key = {index}/>
                ))}
            </ul>
        </div>
    );
};

export default Countries;