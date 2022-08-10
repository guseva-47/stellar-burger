type TLocation = {
  pathname?: string;
  state?: TLocationState;
};

type TLocationState = {
  backgroundLocation?: TLocation;
  from?: {
    pathname: string;
  };
};

export default TLocation;
