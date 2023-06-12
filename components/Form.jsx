import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState, useEffect } from "react";

const Form = ({formData, forNewMovie = true}) => {
    const router = useRouter();

    const [form, setForm] = useState({
        title: formData.title,
        description: formData.description
    })

    const [message, setMessage] = useState([]);

    useEffect(() => {
        setForm(formData)
    }, [formData])

    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        forNewMovie ? postData(form) : putData(form);
    }

    const putData = async (form) => {
        setMessage([]);
        const { id } = router.query;

        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    
                    setMessage(oldMessage => [
                        ...oldMessage,
                        {message: error.message}
                    ]);
                }
            } else {
                setMessage([]);
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const postData = async (form) => {
        setMessage([]);
        try {

            const res = await fetch('api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    
                    setMessage(oldMessage => ([
                        ...oldMessage,
                        {message: error.message}
                    ]));
                }
            } else {
                setMessage([]);
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="form-control my-2"
                    placeholder="Título"
                    autoComplete="off"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    className="form-control my-2"
                    placeholder="Descripción"
                    autoComplete="off"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
                <button className="btn btn-primary w-100" type="submit">
                    {forNewMovie ? 'Agregar' : 'Editar'}
                </button>
                <Link href={'/'}>
                    <button className="btn btn-warning w-100 my-2">Volver</button>
                </Link>
                {
                    message.map(({message}) => (
                        <p key={message}>{message}</p>
                    ))
                }
            </form>
    )
}

export default Form;