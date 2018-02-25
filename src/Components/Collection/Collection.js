import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {styles} from "./Collection.style";
import {CreateStyleFrom} from '../../Utils/styleProvider';
import './Collection.css';
import '../../semantic/dist/components/card.css'
import '../../semantic/dist/components/image.css'
const STYLE = CreateStyleFrom(styles);

export default class Collection extends Component {

  static propTypes = {
      avatar_url: PropTypes.any,
      banner_url: PropTypes.any,
      data: PropTypes.object,
      display_name: PropTypes.any,
      fixed_width: PropTypes.any,
      profile_url: PropTypes.any,
      viewCollection: PropTypes.func
  };

  constructor(props){
      super(props)
  }


  RenderGifPreview = (props) => {
      console.log(props, '--------------')
      const {downsized_still} = props.images;
      return (<div className="Preview">
          <div style={{backgroundImage: "url(" + downsized_still.url + ")"}}
              className="Image"
              onClick={() => this.props.viewCollection(this.props.data)}
          />
          <div className="Reaction">
              <i className=" Left attach icon" />
              <i className=" Right like icon" />
              <i className="Right eye icon" />
              <i className="Right comment icon" />
          </div>
      </div>);
  };

  RenderUserProfile = (props) => {
      const {avatar_url, banner_url, display_name, profile_url} = props;
      return (
          <div className="User">
              <a
                  target="_blank"
                  href={profile_url}
                  className="Profile meta ">
                  <img className="ui avatar image"
                      src={avatar_url} alt="Loading..."/>
              </a>
              <div className="Name meta">
                  {display_name}
              </div>
          </div>
      )
  };

  render() {
      const {RenderUserProfile, RenderGifPreview} = this;
      const {data} = this.props;
      return (
          <div
              className="eight wide mobile five wide tablet four wide computer column Collection">
              <div className="Content">
                  <RenderGifPreview
                      {...data}
                  />

              </div>
              <RenderUserProfile
                  {...data.user}
              />
          </div>
      );
  }
}
