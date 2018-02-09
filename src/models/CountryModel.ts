import {Record, define} from 'type-r'

@define
class CountryModel extends Record {
    static attributes = {
        name: String,
        prefix: Number
    };
    name: string;
    prefix: number;
}

export default CountryModel;