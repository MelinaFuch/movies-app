import Form from "../../components/Form";

const New = () => {
    const formData = {
        title: '',
        description: ''
    }

    return (
        <div className="container">
            <h1 className="my-3">Agregar película</h1>
            <Form formData={formData}/>
        </div>
    )
}

export default New;