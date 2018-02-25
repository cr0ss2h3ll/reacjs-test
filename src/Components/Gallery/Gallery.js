import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {styles} from "./Gallery.style";
import {CreateStyleFrom} from '../../Utils/styleProvider';
import Collection from "../Collection/Collection";
import './Gallery.css';
const STYLE = CreateStyleFrom(styles);

export default class Gallery extends Component {

  static propTypes = {
      collectionDataStack: PropTypes.array,
      collectionData: PropTypes.array,
      collectionDataBundle: PropTypes.array,
      viewCollection: PropTypes.func
  };

  eachCollection = (props) => {
      const {collectionData} = props;
      const {viewCollection} = this.props;
      return (<Collection key={collectionData.id}
          viewCollection={viewCollection}
          data={collectionData}/>)
  };

  RenderCollections = (props) => {
      const {collectionDataStack} = props;
      if (collectionDataStack.length <= 0) {
          return (<div><p>Fetching...</p></div>);
      }
      else {
          return collectionDataStack.map((collectionData) => this.eachCollection({collectionData}));
      }
  };

  render() {
      const {RenderCollections} = this,
          {collectionDataStack, viewCollection} = this.props;
      return (
          <div className="Gallery ui grid centered">
              <RenderCollections
                  collectionDataStack={collectionDataStack}
                  viewCollection={viewCollection}
              />
          </div>
      );
  }
}
