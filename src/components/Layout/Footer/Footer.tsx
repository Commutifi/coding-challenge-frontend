import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<span className='footer-title'>&copy; Commutifi coding challenge frontend. All rights reserved</span>
			</div>
		</footer>
	);
};

export default Footer;
