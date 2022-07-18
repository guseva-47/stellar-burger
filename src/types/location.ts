type TLocation = {
  pathname?: string;
  state?: {
    backgroundLocation?: TLocation;
    from?: {
      pathname: string;
    };
  };
};

export default TLocation;
