import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import BlockUi from 'react-block-ui';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import MetadataSp from '../../views/MetadataSp/';
import Request from '../../views/Request/';
import Response from '../../views/Response/';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ScrollToTop from 'react-scroll-up';

import ReduxStore from "../../redux/store";
import Utility from '../../utility';


new ReduxStore();

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			blocking: false,
			modal_open: false,
			modal_title: "Attendere prego",
			modal_subtitle: "",
			modal_body: "Elaborazione in corso... Si prega di attendere. Grazie.",
			modal_btn_primary_func: ()=> {Utility.showModal({isOpen: false})},
			modal_btn_primary_text: "Chiudi",
			modal_btn_secondary_func: null,
			modal_btn_secondary_text: ""
		};

		this.utilStore = ReduxStore.getUtil();		
		this.modalStore = ReduxStore.getModal();		
		this.unsubscribeUtil = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
		this.unsubscribeModal = this.modalStore.subscribe(()=>this.onModalStoreUpdate());
	}	
	
	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState(); 
		this.setState({
			blocking: utilState.blockUI
		}, ()=>{
			// state updated
		});
	}

	onModalStoreUpdate() {
		let modalState = this.modalStore.getState(); 
		Utility.log("State", this.state);

		Utility.log("New state", modalState);
		this.setState({
			modal_open: modalState.isOpen,
			modal_title: (modalState.title!=null && modalState.title!="")? modalState.title : this.state.modal_title,
			modal_subtitle: (modalState.subtitle!=null && modalState.subtitle!="")? modalState.subtitle : this.state.modal_subtitle,
			modal_body: (modalState.body!=null && modalState.body!="")? modalState.body : this.state.modal_body,
			modal_btn_primary_func: (modalState.btnPrimaryFunc!=null)? modalState.btnPrimaryFunc : this.state.modal_btn_primary_func,
			modal_btn_primary_text: (modalState.btnPrimaryFunc!=null && modalState.btnPrimaryText!=null && modalState.btnPrimaryText!="")? modalState.btnPrimaryText : this.state.modal_btn_primary_text,
			modal_btn_secondary_func: (modalState.btnSecondaryFunc!=null)? modalState.btnSecondaryFunc : this.state.modal_btn_secondary_func,
			modal_btn_secondary_text: (modalState.btnSecondaryFunc!=null && modalState.btnSecondaryText!=null && modalState.btnSecondaryText!="")? modalState.btnSecondaryText : this.state.modal_btn_secondary_text,
		}, ()=>{
			Utility.log("Updated state", this.state);
		});
	}	

	render() {    
		
		if(!Utility.isAuthenticated()) {
			Utility.log("AUTH CHECK", "User not authenticated, redirect to login");
			window.location="/#/login";
			return null;
			
		} else {
			Utility.log("AUTH CHECK", "User authenticated, you can continue");
			return (
				<div id="main">
					<BlockUi tag="div" blocking={this.state.blocking}> 
						<div className="app">
							<Header />
							<div className="app-body">
								<Sidebar {...this.props}/>
								<main className="main">
								<Breadcrumb />
								<Container fluid>
									<Switch>
									<Route path="/metadata-sp-download" name="Metadata Service Provider / Download" component={MetadataSp}/>
									<Route path="/request" name="Request Validator" component={Request}/>
									<Route path="/response/:id" name="Response Validator" component={Response}/>
									<Redirect from="/" to="/request"/>
									</Switch>
								</Container>
								<ScrollToTop showUnder={160}>
									<button className="btn btn-lg btn-primary"><span className="icon-arrow-up"></span></button>
								</ScrollToTop>							
								</main>
								<Aside />
							</div>
							<Footer />
						</div>
					</BlockUi>
					<Modal isOpen={this.state.modal_open}>
						<ModalHeader>{this.state.modal_title}
							<span className="modal-subtitle" dangerouslySetInnerHTML={{__html:this.state.modal_subtitle}}></span>
						</ModalHeader>
						<ModalBody>
							<div dangerouslySetInnerHTML={{__html: this.state.modal_body}}></div>
						</ModalBody>
						<ModalFooter>
							{(this.state.modal_btn_primary_func!=null) &&
								<Button color="primary" onClick={ this.state.modal_btn_primary_func }>{ this.state.modal_btn_primary_text }</Button>
							}
							{(this.state.modal_btn_secondary_func!=null) &&
								<Button color="secondary" onClick={ this.state.modal_btn_secondary_func }>{ this.state.modal_btn_secondary_text }</Button>
							}
						</ModalFooter>
					</Modal>
				</div>			
			);
		}
  }
  
}

export default Main; 