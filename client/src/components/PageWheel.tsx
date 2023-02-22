import { useAppDispatch } from '../utility/hooks';
import { increasePage, decreasePage, getPaintingsFromPage } from '../store';
import { useEffect } from 'react';
export const PageWheel = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage, totalPages } = p;
    return (
        <>
            <PreviousPage currentPage={currentPage} />
            <CurrentPage currentPage={currentPage} totalPages={totalPages} />
            <NextPage currentPage={currentPage} totalPages={totalPages} />
        </>
    );
};

const CurrentPage = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage } = p;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPaintingsFromPage(currentPage));
    }, [currentPage]);
    return <div>{currentPage}</div>;
};

const PreviousPage = (p: { currentPage: number }) => {
    const { currentPage } = p;
    const dispatch = useAppDispatch();
    if (currentPage <= 1) {
        return <div>-</div>;
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
