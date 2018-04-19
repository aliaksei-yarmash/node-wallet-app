import React from 'react';
import styled from 'react-emotion';
import { injectGlobal } from 'emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { prepareCardsData } from './../utils';
import {
	CardsBar,
	Header,
	History,
	Prepaid,
	MobilePayment,
	Withdraw
} from './';
import './fonts.css';

injectGlobal`
	html,
	body {
		margin: 0;
	}

	#root {
		height: 100%;
		font-family: 'Open Sans';
		color: #000;
	}
`;

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
`;

const CardPane = styled.div`
	flex-grow: 1;
`;

const Workspace = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 970px;
	padding: 15px;
`;

/**
 * Приложение
 */
const App = ({ cardsList, rootCardId }) => {
	const rootCard = cardsList.find(card => card.id === rootCardId);
	const inactiveCardsList = cardsList.filter(card => card.id !== rootCardId);

	return (
		<Wallet>
			<CardsBar />
			<CardPane>
				<Header />
				<Workspace>
					<History />
					<Prepaid
						rootCardId={rootCardId}
						inactiveCardsList={inactiveCardsList}
					/>
					<MobilePayment rootCard={rootCard} />
					<Withdraw
						rootCardId={rootCardId}
						inactiveCardsList={inactiveCardsList}
					/>
				</Workspace>
			</CardPane>
		</Wallet>
	);
};

App.propTypes = {
	rootCardId: PropTypes.number,
	cardsList: PropTypes.array
};

const mapStateToProps = state => {
	const cardsList = prepareCardsData(state.cards);
	const cardHistory = state.transactions.map(transaction => {
		const card = cardsList.find(card => card.id === transaction.cardId);
		return card ? Object.assign({}, transaction, { card }) : transaction;
	});

	return {
		rootCardId: state.rootCardId,
		cardsList,
		cardHistory
	};
};

export default connect(
	mapStateToProps
)(App);
