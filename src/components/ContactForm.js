import { useEffect, useState } from "react"


export default function ContactForm(){
    const [formData, setFormData] = useState({})
    const [terms, setTerms] = useState(false)
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if(formData.firstName && formData.lastName && formData.terms){
        setValidForm(true)
        }
    }, [formData.firstName, formData.lastName, formData.terms])


    // e is a shortahnd for event 
    const sendData = e => {
        e.preventDefault() // stopping behavior of wanting to refresh the page, & allowing us to control it
        
        fetch(`${process.env.REACT_API_ENDPOINT}/hot`, {
            method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log('Success', data))
    .catch(err => console.error(err))
    }

    const setFormOject = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    console.log(formData)
    
    return( 
    <>
    <form>
        <label>
            First Name: 
            <input 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            // onChange={event => setFormData( {...formData, firstName: event.target.value} )} /> 
            onChange={setFormOject}
            /> 
        </label>
        
        <br />
        <label>
            Last Name: 
        <input type="text" name="lastName" onChange={setFormOject}/> 
        </label>
         
        <br />
        <label>
            Address: 
        <input type="text" name="address" onChange={setFormOject}/>  
        </label>
        
        <br />
        <label>
            Zip: 
        <input 
        type="text" name="zip" maxLength={5} onChange={setFormOject}/>  
        </label>
        
        <br />
        <label>
            State:
        <select name="state" onChange={setFormOject}>
            <option value=""></option>
            <option value="fl">FL</option>
            <option value="il">IL</option>
            <option value="ny">NY</option>
            <option value="nj">NJ</option>
        </select>
        </label>
        <br />

        <label>
            Date:
        <input type="date" name="date" />
        </label>

        <br />
        <label> Terms and conditions
        <input type="checkbox" onChange={setFormOject} />
        </label>
        <br />

        <label>message:
            <textarea name="message" cols="30" rows="10" onChange={setFormOject}/>
        </label>
        <br />

        <button onClick={(e)=>sendData(e)} >
        Submit
        </button>
    </form>
    </>
    )
}