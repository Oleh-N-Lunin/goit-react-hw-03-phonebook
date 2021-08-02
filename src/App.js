import Form from "./components/Form/Form";
import СontactList from "./components/ContactList/ContactList";
import SearchContact from "./components/SearchContact/SearchContact";
import React from "react";

import styles from "./components/FormStyles/FormStyles.module.css";


class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const getStorageContact = localStorage.getItem('contact');
    const parseStorageContact = JSON.parse(getStorageContact);
    if (getStorageContact) {
      this.setState({ contacts: parseStorageContact });
    }
  }

  addContact = contact => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  valuesFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getFilter = () => {
    const { filter, contacts } = this.state;
    const filtredValues = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filtredValues),
    );
  };

  checkName = (newName) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join(''),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filtredContact = this.getFilter();
    return (
      <div className={styles.container}>
        <h1 className={styles.headingForm}>Phone Book</h1>
        <Form onSubmit={this.addContact} contactList={this.checkName} />
        <h2 className={styles.contactList}>Contacts</h2>
        <SearchContact value={this.state.filter} SearchContact={this.valuesFilter} />
        <СontactList contactList={filtredContact} onDeleted={this.deleteContact} />
      </div>
    );
  }
}

export default App;
