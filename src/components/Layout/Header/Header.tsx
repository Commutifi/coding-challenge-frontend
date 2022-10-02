import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className='container'>
				<div className='logo'>
					<img src='https://openweathermap.org/img/w/10d.png' alt='logo' />
					WEATHER
				</div>
			</div>
		</header>
	);
};

export default Header;
