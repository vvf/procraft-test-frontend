import {Record, define} from 'type-r'

@define
class ProfessionModel extends Record {
    static attributes = {
        name: String
    };
    name: string;
    part1: string;
    part2: string;
}

export default ProfessionModel;