import { Props } from '../../../types/types';
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
    if (currentPage <= 1) {
        return <div>NILL</div>;
    }
    return <div>{`<`}</div>;
};

const NextPage = (p: { currentPage: number; totalPages: number }) => {
    const { currentPage, totalPages } = p;
    if (currentPage >= totalPages) {
        return <div>NILL</div>;
    }
    return <div>{`>`}</div>;
};
