/**
 * 404
 * 2019-04-28 Joker Chen
 */
import React from 'react';
import img from '../../style/img/404.png';


class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center" style={{height: '100%', overflow: 'hidden',textAlign: 'center'}}>
                <img src={img} alt="404" />
            </div>
        )
    }
}

export default NotFound;