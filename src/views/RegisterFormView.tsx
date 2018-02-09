import * as React from 'react';
import {Component} from 'react-mvx/lib/component';
import {Record} from 'type-r';
import {define} from 'react-mvx';
import "../styles/RegisterForm.css";
import {Button, FormGroup, ButtonGroup, MenuItem, Popover, Position, Menu, Intent} from "@blueprintjs/core";
import {Suggest} from "@blueprintjs/select";
import ProfessionModel from "../models/ProfessionModel";
import globalStore from "../models/store";
import "flag-icon-css/css/flag-icon.css";
import CountryModel from "../models/CountryModel";

interface RegisterFormViewProps {

}

const ProfessionSuggest = Suggest.ofType<ProfessionModel>();

@define
class RegisterFormView extends Component<RegisterFormViewProps> {
    static state = {
        firstName: String,
        lastName: String,
        profession: String,
        phone: String,
        country: CountryModel.shared,
        isCountryPopoverOpened: Boolean
    };
    state: Record & {
        firstName: string
        lastName: string
        profession: string
        phone: string
        country: CountryModel
        isCountryPopoverOpened: boolean
        linkAt: (key) => any
    };

    render() {

        return <div className="register-form">
            <header>
                <b>Зарегистрируйтесь</b> и начните продовать услуги через интернет сегодня
            </header>

            <FormGroup className="form-field_firstName"
                       label="Имя"
                       labelFor="field_firstName"
            >
                <input
                    name="firstName" id="firstName"
                    {...this.linkAt("firstName").props}
                />
            </FormGroup>
            <FormGroup className="form-field_lastName"
                       label="Фамилия"
                       labelFor="field_firstName"
            >
                <input
                    name="lastName" id="lastName"
                    {...this.linkAt("lastName").props}
                />
            </FormGroup>
            <FormGroup className="form-field_profession"
                       label="Профессия"
                       labelFor="field_profession"
            >
                <ProfessionSuggest

                    noResults={<MenuItem disabled={true} text="No results."/>}
                    inputValueRenderer={(item: ProfessionModel) => item.name}
                    onItemSelect={(item: ProfessionModel) => {
                        this.state.profession = item.name
                    }}
                    inputProps={{placeholder: ""}}
                    itemRenderer={this.professionItemRender}
                    itemPredicate={this.filterProfession}
                    items={globalStore.professions}
                    popoverProps={{popoverClassName: 'suggest_profession'}}
                />
            </FormGroup>
            <FormGroup className="form-field_phone"
                       label="Телефон"
                       labelFor="field_profession"
            >
                <ButtonGroup>
                    <Popover

                        onInteraction={(isOpen) => this.state.isCountryPopoverOpened = isOpen}
                        isOpen={this.state.isCountryPopoverOpened}
                        position={Position.RIGHT}
                        content={this.getCountriesList()}>
                        <Button
                            rightIconName="chevron-down"
                            className={"flag-icon flag-icon-" + this.state.country}
                        >
                            {this.state.country
                                ? <span className={"flag-icon flag-icon-" + this.state.country.id}/>
                                : <span className="no-flag">🌎</span>}
                        </Button>
                    </Popover>
                    <span className="phone-input-wrapper">
                        <span>{this.state.country ? '+' + this.state.country.prefix : '+XX'}</span>
                        <input type="tel"
                               placeholder='861 123-45-67'
                               {...this.linkAt('phone').props}
                        />
                    </span>
                </ButtonGroup>
            </FormGroup>
            <div className="register-button-wrapper">
                <Button intent={Intent.PRIMARY} text="Зарегистрироваться"/>
            </div>
        </div>;
    }

    // inputRenderer={(item:ProfessionModel)=><MenuItem text={item.name}/>}

    private professionItemRender = ({item, handleClick, isActive, index}) => {
        if (index > 10) {
            return null;
        }
        return <li
            key={index}
            onClick={handleClick}
            className={isActive ? "active" : ""}
        ><span className="pt-menu-item">
            {item.part1 && <b>{item.part1}</b>}{item.part2}</span></li>;
    };
    private filterProfession = (query, item, index) => {
        if (index > 10) {
            return false
        }
        const queryLength = query.length;
        item.part1 = item.name.substr(0, queryLength);
        item.part2 = item.name.substr(queryLength);

        return item.part1.toLowerCase() == query.toLowerCase();
    };

    getCountriesList() {
        return <div className="countries-list">
            <Menu>
                {globalStore.countries.map(country => <MenuItem

                        onClick={(event) => {
                            event.preventDefault();
                            this.state.country = country;
                            this.state.isCountryPopoverOpened = false;
                        }}
                        text={country.name}
                    />
                )}
            </Menu>
        </div>
    }
}

export default RegisterFormView;