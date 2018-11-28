import React from 'react'
import ReactDom from 'react-dom'
import List from './components/list'
import ReactPullToRefresh from '../src/index'
import './app.styl'

const defaultData = ['one', 'two', 'three']


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [...defaultData],
            ptrDisabled: true
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

