const getters = {
    token: state => state.user.token,
    uid: state => state.user.userInfo.uid,
    limits: state => state.user.userInfo.jobTitle,
}

export default getters