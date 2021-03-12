import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../store/action'
import firebase from '../../config/firebase'

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }
    componentDidMount() {
        this.props.getUser()
    }


    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.currentUser
        let merge = this.uid_merge(current_user.uid , user.uid)

        this.get_messages(merge)
       
    }

    uid_merge = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2
        }
        else {
            return uid2 + uid1
        }
    }

    get_messages = (uid) =>{
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added',(messages)=>{
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }

    send_message = () => {

        let current_user = this.props.currentUser
        let chat_user = this.state.chat_user
        let merge = this.uid_merge(current_user.uid , chat_user.uid)

        firebase.database().ref('/').child(`chats/${merge}`).push({
            message: this.state.message,
            name : current_user.name,
            uid : current_user.uid
        })
        // this.state.chats.push({
        //     message: this.state.message
        // })
        this.setState({
            message: ""
        })
    }
    render() {
        // console.log("User", this.props.users)
        let user = this.props.currentUser
        return (
            <div>
                <h4>Chat {user.name}</h4>
                <img src={user.profile} />
                <h6>Email : {user.email}</h6>
                <div style={{ display: "flex", padding: "20" }}>
                    <div style={{ backgroundColor: "yellow" }}>Chat Users:
                    <ul>
                            {this.props.users.map((v, i) => {
                                return v.uid !== user.uid && <li key={i}><img src={v.profile} width="20" />{v.name}
                                    <button onClick={() => this.chat(v)}>Chat</button></li>
                            })}
                        </ul>
                    </div>

                    <div style={{ backgroundColor: "blue" }}>

                        <h5>chat</h5>

                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <ul>
                                    {this.state.chats.map((v, i) => {
                                        return <li style={{color: v.uid === user.uid ? "green" : "red"}} key={i}>{v.message}</li>
                                    })}
                                </ul>
                                <input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" placeholder="Enter your message" />
                                <button onClick={() => this.send_message()}>Send</button></div>
                            :
                            <h4>no user</h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
