import {Store, define, Collection} from 'type-r'
import {countries, professions} from "./dummyData";
import ProfessionModel from "./ProfessionModel";
import CountryModel from "./CountryModel";

@define
class GlobalStore extends Store {
    static attributes = {
        professions: ProfessionModel.Collection,
        countries: CountryModel.Collection,
    };
    professions: Collection & ProfessionModel[];
    countries: CountryModel[] & Collection;
}

const globalStore = Store.global = new GlobalStore({professions, countries});
export default globalStore;