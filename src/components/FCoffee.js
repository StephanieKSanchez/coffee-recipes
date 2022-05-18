import React, { useState, useEffect } from "react";

function FCoffee({ firstName }) { // defining functional React component taking in a prop called firstName
    const [coffeeList, setCoffeeList] = useState(); // creating state variable and setter and setting the state initially to undefined
    const [temperature, setTemperature] = useState('iced');
    useEffect(()=>{ // runs initially & when temperature changes
        fetch(`https://api.sampleapis.com/coffee/${temperature}`) //goes to api point & get coffee
        .then(response => response.json()) //calling json method on the response and waiting to get it
        .then(data => setCoffeeList(data)) 
        .catch(console.error) // console log errors from lines 7 through 9
    },[temperature]) // dependency list 
    return ( //React always returns valid jsx
        <> 
        <h1>Coffee List (F)</h1> 
        <p>Hello {firstName} </p> 
        <button onClick={()=>setTemperature('hot')}>HOT</button>
        <button onClick={()=>setTemperature('iced')}>ICED</button>
        {!coffeeList
            ? <h2>Loading...</h2>
            : <>
            <h2>Coffees</h2>
            {coffeeList.map(coffee => {
                return <p key={coffee.id}>{coffee.title}</p>
            }
            )}
            </>
        }
        </>
    )
}

export default FCoffee;