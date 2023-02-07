import { Props } from '../../../types/types';
import { useAppDispatch } from '../utility/hooks';
import { increasePage, decreasePage } from '../store';
export const PageWheel = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage, totalPages } = p;
    return (
        <>
            {' '}
            <PreviousPage currentPage={currentPage} />
            <CurrentPage currentPage={currentPage} totalPages={totalPages} />
            <NextPage currentPage={currentPage} totalPages={totalPages} />
        </>
    );
};

const CurrentPage = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage } = p;
    return <div>{currentPage}</div>;
};

const PreviousPage = (p: { currentPage: number }) => {
    const { currentPage } = p;
    const dispatch = useAppDispatch();
    if (currentPage <= 1) {
        return <div>NILL</div>;
    }
    return <div onClick={() => dispatch(decreasePage())}>{`<`}</div>;
};

const NextPage = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage, totalPages } = p;
    const dispatch = useAppDispatch();
    if (currentPage >= totalPages) {
        return <div>NILL</div>;
    }
    return <div onClick={() => dispatch(increasePage())}>{`>`}</div>;
};
