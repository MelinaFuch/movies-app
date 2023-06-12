import Form from "../../../components/Form";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";

const fetcher = async url => {

    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error('error');

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    const { data } = await res.json();
    return data;
}

const EditMovie = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const {data: movie, error} = useSWR(
        `/api/movie/${id}`,
        fetcher
    );
    
    
    if (error) {
        return (
            <div>Error</div>
            )
        }
        
        
        if (!movie) {
            return (
                <div className="container mt-5 text-center">
                <h1>Loading...</h1>
            </div>
        )
    }
    
    const formData = {
        title: movie.title,
        description: movie.description
    }

    return (
        <div className="container">
            <h1>Editar película</h1>
            <Form forNewMovie={false} formData={formData}></Form>
        </div>
    )
}

export default EditMovie;