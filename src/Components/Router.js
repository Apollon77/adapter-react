import React, {Component} from 'react';

class Router extends Component {
    constructor(props) {
        super(props);
        this.onHashChangedBound = this.onHashChanged.bind(this);
    }

    componentDidMount() {
        window.addEventListener('onhashchange', this.onHashChangedBound);
    }

    componentWillUnmount() {
        window.removeEventListener('onhashchange', this.onHashChangedBound);
    }

    onHashChanged() {
        // override this function
    }

    static getLocation() {
        let hash = window.location.hash;
        hash = hash.replace(/^#/, '');
        const parts = hash.split('/');
        // #tabName/dialogName/deviceId
        return {tab: parts[0] || '', dialog: parts[1] || '', id: parts[2] || ''};
    }

    static doNavigate(tab, dialog, id) {
        let hash = '';
        const location = Router.getLocation();
        if (id && !dialog) {
            dialog = location.dialog;
        }
        if (dialog && !tab) {
            tab = location.tab;
        }

        if (tab) {
            hash = '#' + tab;
            if (dialog) {
                hash += '/' + dialog;

                if (id) {
                    hash += '/' + id;
                }
            }
        }
        if (window.location.hash !== hash) {
            window.location.hash = hash;
        }
    }
}

export default Router;