import { useNavigate } from 'react-router-dom';
import { Button } from '../utility/Button';
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
