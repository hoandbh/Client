import { useNavigate } from 'react-router-dom';

const HomePage = ({ login }) => {

    const navigate = useNavigate(); 
    
    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (<>
        <p>
            you have to indenfity
        </p>
        <button onClick={handleLogin}>
            login
        </button>
        <button onClick={handleRegister}>
            register
        </button>

    </>

    )

}

export default HomePage;