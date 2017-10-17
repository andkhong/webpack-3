import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/index';

export default function Thing (props) {
    return (
        <div className={styles.World}>
            Dead Code {props.name}
        </div>
    );
}

Thing.propTypes = {
    name: PropTypes.string
};