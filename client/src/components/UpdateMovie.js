import React,{useState,useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    console.log(props);
    const [values, setValues] = useState({ 
        id:'',
        name:'',
        title:'',
        metascore:'',
        stars:[]

    })

    useEffect(() => {
        const data = props.location.state;
        setValues(data)
    },[props.location.state])
    const handleChange = (e) =>{
        if (e.target.name === 'stars'){
            let temp = e.target.value;
            temp = temp.split(',');
            console.log(temp)
            setValues({
                ...values,
                [e.target.name]: temp
            })
        }else{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })}
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(values);
        axios.put(`http://localhost:5000/api/movies/${values.id}`,values)
        .then(resp => props.history.push(`/movies/${values.id}`))
        .catch(err => console.log(err))
        
    };
    
    return(<>
    
    <form className='edit-form'onSubmit={handleSubmit}>
        <input name='title' id='title' type='text' onChange={handleChange} value={values.title}/>
        <input name='director' id='director' type='text' onChange={handleChange} value={values.director}/>
        <input name='metascore' id='metascore' type='text' onChange={handleChange} value={values.metascore}/>
        <input className='form-stars-list'name='stars' id='stars' type='text' onChange={handleChange} value={values.stars}/>
        <button>Submit Change</button>
    </form>
    
    
    
    
    </>);
}
export default UpdateMovie;