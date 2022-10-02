import React from 'react';
import ReactHelmet from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import './MainLayout.scss';

interface Props {
	title?: string;
	children?: React.ReactNode;
	className?: string;
}

const MainLayout = ({ title, children, className }: Props) => {
	return (
		<div className='main-layout'>
			<ReactHelmet>
				<title>{title}</title>
			</ReactHelmet>
			<img src='/images/background.png' alt='background' className='background' />
			<Header />
			<main className={className}>{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
