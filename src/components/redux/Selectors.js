export const selectContactsList = state => state.contacts.contacts.items;
export const selectFilterValue = state => state.contacts.filter;

export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
