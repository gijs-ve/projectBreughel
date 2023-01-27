import { RawState } from '../../../../types/types';
export const selectIsUserAdmin = (state: RawState) => {
    if (!state.userState || !state.userState.profile) return null;
    return state.userState.profile.isAdmin;
};

export const selectToken = (state: RawState) => {
    if (!state.userState || !state.userState.token) return null;
    return state.userState.token;
};
