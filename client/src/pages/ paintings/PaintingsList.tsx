import { useEffect } from 'react';
import { PageWheel } from '../../components/PageWheel';
import { getPageCount, selectCurrentPage, selectTotalPages } from '../../store';
import { useAppDispatch, useAppSelector } from '../../utility/hooks';

export const PaintingsList = () => {
    const dispatch = useAppDispatch();
    const totalPages = useAppSelector(selectTotalPages);
    const currentPage = useAppSelector(selectCurrentPage);
    useEffect(() => {
        dispatch(getPageCount());
    }, []);
    return (
        <>
            <PageWheel
                currentPage={currentPage ? currentPage : 1}
                totalPages={totalPages ? totalPages : 10}
            />
        </>
    );
};
