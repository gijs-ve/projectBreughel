import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const navigateToCollections = () => {
        navigate('/collecties');
    };
    return (
        <>
            <Button
                onClickEvent={() => navigateToCollections()}
                text="Bekijk collecties"
            />
        </>
    );
};

export { Home };
