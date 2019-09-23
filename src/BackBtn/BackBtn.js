import React from 'react';

class BackButton extends React.Component {
    static contextTypes = {
      router: () => true, // replace with PropTypes.object if you use them
    }
    render() {
      return (
        <button
          className="button icon-left"
          onClick={this.context.router.history.goBack}>
            Back
        </button>
      )
    }
  }
  
export default BackButton;