import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'loadsh'
import PullToRefreshJS from 'pulltorefreshjs'
import { findDOMNode } from 'react-dom'

class PullToRefresh extends Component {
    static defaultProps = {
        disabled: false,
        onRefresh: () => { },
        distanceToRefresh: 75
    }

    static propTypes = {
        distanceToRefresh: PropTypes.number,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        onRefresh: PropTypes.func
    }


    constructor(props) {
        super(props)
        this.elementId = uniqueId('ptr')
    }

    componentDidMount() {
        if (!this.props.disabled) this.initPullToRefresh()
    }

    componentDidUpdate(preProps) {
        const disabledToEnabled = preProps.disabled && !this.props.disabled
        const enabledToDisabled = !preProps.disabled && this.props.disabled

        if (disabledToEnabled) this.initPullToRefresh()
        if (enabledToDisabled) this.$instance.destroy()
    }

    componentWillUnmount() {
        this.$instance.destroy()
    }

    initPullToRefresh() {

        this.$instance = PullToRefreshJS.init({
            mainElement: `#${this.elementId}`,
            triggerElement: `#${this.elementId}`,
            onRefresh: () => this.props.onRefresh(),
            shouldPullToRefresh: () => {
                const containerElement = findDOMNode(this)
                console.log('containerElement', containerElement)

                return !window.scrollY
            }
        })
        console.log(this.$instance)
    }

    render() {
        return <div className={this.props.className} style={this.props.style} id={this.elementId}>{this.props.children}</div>
    }


}


export default PullToRefresh