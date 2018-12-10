import React from 'react'
import ReactDom from 'react-dom'
import List from './components/list'
import ReactPullToRefresh from '../src/index'
import './app.styl'

const defaultData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [...defaultData],
            ptrDisabled: false
        }
    }

    componentDidMount() {
        console.log('component mounted')
        setTimeout(() => {
            this.setState({ ptrDisabled: false })
        }, 2000);
    }

    onRefresh() {
        console.log('onRefresh called')
    }

    render() {
        return (<ReactPullToRefresh className="container" disabled={this.state.ptrDisabled} onRefresh={this.onRefresh}>
            <h1 style={{ 'textAlign': 'center' }}>Pull down to refresh</h1>
            <List data={this.state.data}></List>
        </ReactPullToRefresh>)
    }
}

ReactDom.render(<App />, document.querySelector('#app'))

