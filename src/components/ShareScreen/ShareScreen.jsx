import React from 'react';
import {connect} from 'react-redux';
import styles from './ShareScreen.css';
import ShareIco from 'material-ui/svg-icons/Communication/screen-share';

class ShareScreen extends React.Component {
    constructor(props) {
        super(props)
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        if(this.props.items.length == 0) {
            console.warn('No screen to share!');
            return;
        }

        if (!this.context.socket || this.context.socket.status !== 'connected') {
            console.warn('Socket is unavailable!');
            return;
        }

        var message = {
            content: JSON.stringify(this.props.items),
            color: localStorage.getItem('__barrage_name_color'),
            nickname: this.props.nickname,
            mmr: this.props.mmr,
        };

        this.context.socket.emit('message:send:screen', message);
    }

    render() {

        return (
            <div onClick={this.sendMessage} data-tip="发送屏幕，将当前正在观看的频道发送至聊天" className={styles.shareScreen}>
                <ShareIco />
            </div>
        )
    }
}

ShareScreen.contextTypes = {
    socket: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    items: state.screenItems,
})

export default connect(mapStateToProps)(ShareScreen);