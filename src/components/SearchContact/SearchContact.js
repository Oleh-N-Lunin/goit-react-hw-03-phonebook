import PropTypes from 'prop-types';
import shortid from 'shortid';

import styles from "../FormStyles/FormStyles.module.css";

function SearchContact({ value, SearchContact }) {
    const id = shortid.generate();
    return (
        <div className={styles.containerSearch}>
            <label className={styles.labelSearch} htmlFor={id}>Search contact by name</label>
            <input
                className={styles.inputSearch}
                type="text"
                name="filter"
                value={value}
                onChange={SearchContact}
                id={id}
            />
        </div>
    );
}

SearchContact.propTypes = {
    value: PropTypes.string.isRequired,
    SearchContact: PropTypes.func.isRequired,
};

export default SearchContact;