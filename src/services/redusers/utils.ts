export type TIsLoadFailed = {
  isLoading: boolean;
  isFailed: boolean;
};

export type TIsLoadFailedErrMsg = TIsLoadFailed & {
  errMessage: string;
};

export const initIsLoadFailed = (): TIsLoadFailed => ({ isLoading: false, isFailed: false });

export const initIsLoadFailedErrMsg = (): TIsLoadFailedErrMsg => ({
  isLoading: false,
  isFailed: false,
  errMessage: '',
});
