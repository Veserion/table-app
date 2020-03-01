import { DataStore } from "./index";

class RootStore {
  public dataStore: DataStore;

  constructor(initState: any) {
    this.dataStore = new DataStore(
      this,
      initState && initState.dataStore ? initState.dataStore : null
    );
  }

  public serialize = () => ({
    dataStore: {
      userData: this.dataStore.userData,
      dataSource: this.dataStore.dataSource
    }
  });
}

export { RootStore };
