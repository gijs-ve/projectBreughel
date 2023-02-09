import { RawState } from '../../../../types/types';
export const selectCurrentPage = (state: RawState) => {
    return state.paintingState?.pages?.currentPage;
};
export const selectTotalPages = (state: RawState) => {
    return state.paintingState?.pages?.totalPages;
};

export const selectPaintings = (state: RawState) => {
    return state.paintingState?.paintings;
};

export const selectFilters = (state: RawState) => {
    return state.paintingState?.filters;
};
