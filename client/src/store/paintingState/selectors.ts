import { RawState } from '../../../../types/types';
export const selectCurrentPage = (state: RawState) => {
    return state.paintingState?.pages?.currentPage;
};
export const selectTotalPages = (state: RawState) => {
    return state.paintingState?.pages?.totalPages;
};
