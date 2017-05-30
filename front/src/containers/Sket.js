import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes as ReactPropTypes } from 'prop-types';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Loading from 'react-loading';

import IndexContent from './IndexContent';
import GameContent from './GameContent';

import * as actions from '../actions';


function createWarning(funcName) {
    return () => console.warn(funcName + ' is not defined in Sket');
}

const propTypes = {
    /* 로그인 */
    isLoggedIn: ReactPropTypes.bool,
    fetchingUpdate: ReactPropTypes.bool,
    user: ReactPropTypes.object,

    /* 메인 */
    fetchingConnect: ReactPropTypes.bool,
    isConnecting: ReactPropTypes.bool,
    isSocketFetching: ReactPropTypes.bool,

    userList: ReactPropTypes.array,
    roomList: ReactPropTypes.array,
    ranking: ReactPropTypes.object,
    isShowRanking: ReactPropTypes.bool,

    /* dispatcher function */
    handleLoginRequest: ReactPropTypes.func,
    handleLogin: ReactPropTypes.func,
    handleGuestLogin: ReactPropTypes.func,

    handleLogout: ReactPropTypes.func,

    handleCreateRoom: ReactPropTypes.func,
    handleQuickStart: ReactPropTypes.func,
    handleShowRanking: ReactPropTypes.func
};

const defaultProps = {
    /* 로그인 */
    isLoggedIn: false,
    fetchingUpdate: false,
    user: {},

    /* 메인 */
    fetchingConnect: false,
    isConnecting: false,
    isSocketFetching: false,

    userList: [],
    roomList: [],
    ranking: {},
    isShowRanking: false,

    /* dispatcher function */
    handleLoginRequest: createWarning('handleLoginRequest'),
    handleLogin: createWarning('handleLogin'),
    handleGuestLogin: createWarning('handleGuestLogin'),

    handleLogout: createWarning('handleLogout'),

    handleCreateRoom: createWarning('handleCreateRoom'),
    handleQuickStart: createWarning('handleQuickStart'),
    handleShowRanking: createWarning('handleShowRanking')
};


class Sket extends Component {

    render() {

        const loginPage = (
            <div className="sket-login">
                <div className="login-container">
                    <div className="login-header">
                        <h1>sket.io</h1>
                    </div>

                    <div className="login-content">

                        <div className="login-button">
                            <GoogleLogin
                                clientId="755801497962-25e8cmnp81pcld5r8mfsvmetus9qnnv4.apps.googleusercontent.com"
                                className="action-button shadow animate red"
                                buttonText="구글로 로그인"
                                onSuccess={(res) => { this.props.handleLogin('google', res) }}
                                onFailure={(error) => { console.log(error) }}
                                onRequest={ this.props.handleLoginRequest }
                                offline={false}
                                />
                        </div>

                        <div className="login-button">
                            <FacebookLogin
                                appId="741189302727195"
                                autoLoad={ false }
                                fields="name,email,picture"
                                cssClass="action-button shadow animate blue"
                                textButton="페이스북으로 로그인"
                                onClick={ this.props.handleLoginRequest }
                                callback={(res) => { this.props.handleLogin('facebook', res) }}
                                />
                        </div>

                        <div className="login-button">
                            <button onClick={ this.props.handleGuestLogin }
                                className="action-button shadow animate green"
                                >
                                GUEST로 로그인하기
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )

        const index = (
                <IndexContent
                    user={ this.props.user }
                    userList={ this.props.userList }
                    roomList={ this.props.roomList }
                    ranking={ this.props.ranking }

                    handleLogout={ this.props.handleLogout }
                    handleCreateRoom={ this.props.handleCreateRoom }
                    handleQuickStart={ this.props.handleQuickStart }
                    handleShowRanking={ this.props.handleShowRanking }
                    isShowRanking={ this.props.isShowRanking }
                />
        )

        const game = (
                <GameContent/>
        )

        const rendering = ( this.props.isLoggedIn ? index : loginPage );

        const loading = (<Loading type="cylon" color="white"
                            height='667' width='375' className="loading-svg"/>)

                            // {index}
        return(
            <div className="sket-root">
                { this.props.fetchingUpdate ? loading : rendering }
            </div>
        );
    }
}

Sket.propTypes = propTypes;
Sket.defaultProps = defaultProps;


const mapStateToProps = (state) => {
    const { isLoggedIn, fetchingUpdate, user } = state.login;

    const { fetchingConnect, isConnecting, isSocketFetching } = state.main;
    const { userList, roomList, ranking, isShowRanking } = state.main;

    return {
        /* 로그인 */
        isLoggedIn,
        fetchingUpdate,
        user,

        /* 메인 */
        fetchingConnect,
        isConnecting,
        isSocketFetching,
        isShowRanking,

        userList,
        roomList,
        ranking
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        /* 로그인 핸들링 */
        handleLoginRequest: () => { dispatch(actions.requestLogin()) },
        handleLogin: (social, user) => { dispatch(actions.handleLogin(social, user)) },
        handleGuestLogin: () => { dispatch(actions.handleGuestLogin()) },

        handleLogout: () => { dispatch(actions.handleLogout()) },

        /* 대기 화면 핸들링 */
        handleCreateRoom: (roomInfo) => { dispatch(actions.createRoom(roomInfo)) },
        handleQuickStart: () => { dispatch(actions.quickStart()) },
        handleShowRanking: (userId) => { dispatch(actions.showRanking(userId)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sket);
