import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {styles} from "./Modal.style";
import {CreateStyleFrom} from '../../Utils/styleProvider';
import './Modal.css';
const STYLE = CreateStyleFrom(styles);

export default class Modal extends Component {

  static propTypes = {
      original: PropTypes.any,
      modalBackdropClicked: PropTypes.any,
      modalIsOpen: PropTypes.any,
      viewingCollection: PropTypes.any,
      triggerOnClicked: PropTypes.any
  };

  state = {
      imageIndex : 1
  };

  RenderImageView = (props) => {
      const {original} = props.collection.images;
      console.log(props)
      return (<div className="Gif View">
          <div className="Gif"
              style={{backgroundImage: "url(" + original.url + ")"}}
          />
      </div>);
  };

  RenderBackdrop = (props) => {
      const {modalBackdropClicked} = this.props;
      return (<div
          backdrop="1"
          className="Backdrop"
          onClick={modalBackdropClicked}/>);
  };

  render() {
      const {RenderImageView, RenderBackdrop} = this;
      const {viewingCollection, modalIsOpen, modalBackdropClicked} = this.props;
      return modalIsOpen ? (
          <div className="Modal">
              <RenderImageView  collection={viewingCollection}/>
              <RenderBackdrop />
          </div>
      ) : null;
  }
}
