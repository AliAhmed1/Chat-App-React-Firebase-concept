import React from 'react';
import { connect } from 'react-redux';
import { facebook_login } from '../../store/action';

class Home extends React.Component {

    // static getDerivedStateFromProps(props, state){
    //     return(console.log("mapDispatchToProps",props.facebookLogi_l())
    //     )
    // }
    render() {
        // console.log("mapStateToProps", this.props.users)
        // let users = {
        //     name : "ahmed",
        //     email : "ahmed@gmail.com"
        // }
        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => this.props.facebook_login(this.props.history)}>Set data</button>
                {console.log("history", this.props.history)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    facebook_login: (history) => dispatch(facebook_login(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
