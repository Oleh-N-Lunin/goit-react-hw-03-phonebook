import { Component } from 'react';
import shortid from 'shortid';

import styles from "../FormStyles/FormStyles.module.css";

class Form extends Component {
    state = {
        name: '',
        number: '',
    };

    InputValues = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };

    addContact = e => {
        e.preventDefault();
        const checkName = this.props.contactList({ name: this.state.name });
        if (checkName) {
            alert("You already have this contact name!!");
            return;
        }

        this.props.onSubmit({
            id: shortid.generate(),
            name: this.state.name,
            number: this.state.number,
        });

        this.resetInputValues();
    };

    resetInputValues = () => {
        this.setState({ name: '', number: '' });
    };

    render() {
        const idName = shortid.generate();
        const idNumber = shortid.generate();

        return (
            <form className={styles.form} onSubmit={this.addContact}>
                <label className={styles.labelName} htmlFor={idName}>Name</label>
                <input
                    id={idName}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.InputValues}
                    autoComplete="off"
                />
                <label className={styles.labelNumber} htmlFor={idNumber}>Phone number</label>
                <input
                    id={idNumber}
                    type="tel"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    name="number"
                    value={this.state.number}
                    onChange={this.InputValues}
                    autoComplete="off"
                    required
                />
                <button className={styles.btnForm} type="submit">Add contact</button>
            </form>
        );
    }
}

export default Form;