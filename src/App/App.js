import PropTypes from 'prop-types'
import React, { Component } from 'react';
import './App.css';
import '../semantic/dist/semantic.css'
import {styles} from "./App.style";
import {CreateStyleFrom} from '../Utils/styleProvider';
import Gallery from "../Components/Gallery/Gallery";
import {generateRandAlphaNumStr, generateRandNumberFromRange} from "../Utils/randomizer";
import Modal from '../Components/Modal/Modal';
import {default as _} from 'lodash';
import {isScrollReachedBottom} from "../Utils/scrollReachedBottom";
import {default as AXIOS} from "axios";

const STYLE = CreateStyleFrom(styles);

export default class App extends Component {
  static propTypes = {
      length: PropTypes.any,
      modalIsOpen: PropTypes.bool,
      galleryData: PropTypes.array
  };

  static APIconfig = {
      KEY: `3eFQvabDx69SMoOemSPiYfh9FY0nzO9x`, // This key get from 'https://giphy.com/trending' XHR request
      LIMIT: 20,
      OFFSET: 0
  };

  state = {
      collectionStack: [],
      infiniteDataStack: [],
      viewingCollection: {},
      modalIsOpen: false,
      userReachedBottom: false,

      // Get Giphy Treding
      getGiphyTrending(){
          return AXIOS.get(`https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=${App.APIconfig.LIMIT}&offset=${App.APIconfig.OFFSET}`)
              ||  alert('AXIOS is not imported');
      },
      // Data generator for testing infinite scroll
      collectionDataModel() {
          return {  Id: generateRandAlphaNumStr(10),
              name: generateRandAlphaNumStr(20),
              images: new Array(generateRandNumberFromRange(0,101))
          }
      }
  };

  constructor(props) {
      super(props);
      // Debouncing
      this._handleInfiniteScroll = _.debounce(this._handleInfiniteScroll.bind(this), 200);
  }

  componentWillMount(){
      // Generate Data
      return this._handleFetchData();
  }

  componentDidMount(){
      this._handleFetchData();
      // Infinite scroll registering
      return (window.addEventListener('scroll', this._handleInfiniteScroll) || document.body.addEventListener('scroll', this._handleInfiniteScroll)) ;
  }

  componentWillUnmount() {
      // Remove infinite scroll handler on window's scroll event
      return window.removeEventListener("scroll", () => null);
  }

    _handleFetchData = () => this.state.getGiphyTrending().then(result => {
        if (result.status !== 200) return;
        return this._handleGalleryStackPushData(result.data.data);
    }).then(()=>console.log(App.APIconfig));

    _handleGalleryStackPushData = (data) => this.setState(prevState => ({
        ...prevState,
        infiniteDataStack: prevState.infiniteDataStack.concat(data)
    }), () => App.APIconfig.OFFSET = (App.APIconfig.OFFSET + App.APIconfig.LIMIT));

  _handleInfiniteScroll =  () => {
      // Set range to load async before user reached bottom equal to 1/3 view's height
      let startLoadAsyncBeforeReachedBottom = isScrollReachedBottom(1/3);

      if (!startLoadAsyncBeforeReachedBottom) return;

      return  this.setState({userReachedBottom: startLoadAsyncBeforeReachedBottom},
          () => this._handleFetchData());
  };

  // Toggling view image
  _handleToggleCollectionViewing = (viewingId) => this.setState((prevState) => ({
      modalIsOpen: true,
      viewingCollection: viewingId
  }), () => document.body.className = 'Disable-Scroll');

  // Backdrop handler while viewing
  _handleCollectionViewingBackdropClicked = () => {
      console.log('BACKDROP CLICKED')
      return this.setState((prevState) => ({
          modalIsOpen: false,
          viewingCollection: {}
      }), () => document.body.className = '')
  };

  // Class's method accept one arity used to cache
  RenderModal = (props) =>  (<Modal {...props}/>);

  RenderGallery = (props) =>  !this.state.modalIsOpen ? (<Gallery {...props} />) : null;

  render() {
      const {RenderGallery, RenderModal} = this;
      const {infiniteDataStack, viewingCollection, modalIsOpen} = this.state;
      return (<div className="Main Container fluid center aligned"
          style={STYLE.mainContainer}>
          <RenderModal
              viewingCollection={viewingCollection}
              modalIsOpen={modalIsOpen}
              modalBackdropClicked={this._handleCollectionViewingBackdropClicked}/>
          <RenderGallery
              collectionDataStack={infiniteDataStack}
              viewCollection={this._handleToggleCollectionViewing}
          />
      </div>);
  }
}
